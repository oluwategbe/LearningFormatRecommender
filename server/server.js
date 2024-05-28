const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middlewares/error");
const user = require("./routes/user");
const partner = require("./routes/partner");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");

//load env vars
dotenv.config({ path: "./config/.env" });

//connect to database
connectDB();

const app = express();

//Body Parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//set security headers
app.use(
  helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
);

// Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 mins
  max: 300,
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//enable CORS
app.use(cors());

//logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount Routers
app.use("/api/v1/user/", user);
app.use("/api/v1/partner/", partner);
app.use("/api/v1/auth/", auth);
app.use(errorHandler);

//Set static folder
//Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server and exit process
  server.close(() => process.exit(1));
});

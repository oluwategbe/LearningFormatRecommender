const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  //create token
  sendTokenResponse(user, 200, res);
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  //check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  //check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

//Get token from model, create cookine and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

//@desc Get current logged in user
//@route POST /api/v1/auth/me
//@access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc Log user out / clear cookie
//@route GET /api/v1/auth/logout
//@access Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Forgot Password
// @route   POST/api/v1/auth/forgotpas7sword
// @access   Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  //Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  console.log(resetToken);

  //Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetpassword/${resetToken}`;

  const message = `<h1>Hi ${user.fullname}, </h1>
  <p> You are receiving this email because you (or someone else) has requested
the reset of a password</p>
<p>Click on the button below to reset your password</p>
   <br />
 <a href="${resetUrl}" style="padding:1rem;color: white;
 background: #333333;border-radius:5px;text-decoration:none; cursor: pointer">Reset Password</a>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      content: message,
    });
    res.status(200).json({ success: true, data: "Email Sent" });
  } catch (err) {
    console.log(err.message);
    user.getResetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Reset Password
// @route   PUT/api/v1/auth/resetpassword/:resettoken
// @access   Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid Token", 400));
  }
  // set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save();

  const message = `<h1>Hi ${user.firstname}, </h1>
  <p> Your Password was reset was successful</p>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset successful",
      content: message,
    });
    sendTokenResponse(user, 200, res);
  } catch (err) {
    return next(new ErrorResponse("Email could not be sent", 500));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Reset Password
// @route   PUT/api/v1/auth/resetpassword/:resettoken
// @access   Public
// exports.newPassword = asyncHandler(async (req, res, next) => {
//   //get hashed token
//   const user = await User.findById(req.user.id);
//   if (!user) {
//     return next(new ErrorResponse("User not ƒound", 404));
//   }
//   // set new password
//   user.password = req.body.password;
//   await user.save();

//   const message = `<h1>Hi ${user.firstname}, </h1>
//   <p> Your Password was reset was successful</p>`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Password reset successful",
//       content: message,
//     });
//     sendTokenResponse(user, 200, res);
//   } catch (err) {
//     return next(new ErrorResponse("Email could not be sent", 500));
//   }
// });

const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controller/auth");

const { protect } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
// router.put("/newpassword", protect, newPassword);

module.exports = router;

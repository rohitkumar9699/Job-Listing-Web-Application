const express = require("express");
const router = express.Router();
const {
  register,
  login,
  resetPassword,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/reset", resetPassword);

module.exports = router;
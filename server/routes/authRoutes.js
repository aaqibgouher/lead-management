const express = require("express");
const authController = require("../controller/authControler");
const authMiddlware = require("../middleware/authMiddleware");

const router = express.Router();

// register
router.post("/register", authController.register);

// login
router.post("/login", authController.login);

// logout
router.post("/logout", authMiddlware.isAuthenticated, authController.logout);

// me
router.get("/me", authMiddlware.isAuthenticated, authController.getMe);

// configs
router.get(
  "/configs",
  authMiddlware.isAuthenticated,
  authController.getConfigs
);

module.exports = router;

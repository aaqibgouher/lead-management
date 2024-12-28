const express = require("express");
const authRoutes = require("./authRoutes");
const leadRoutes = require("./leadRoutes");
const authMiddleware = require("../middleware/authMiddleware");
const pocRoutes = require("./pocRoutes");
const interactionRoutes = require("./interactionRoutes");
const orderRoutes = require("./orderRoutes");

const router = express.Router();

// auth
router.use("/auth", authRoutes);

// pocs
router.use("/leads/pocs", [authMiddleware.isAuthenticated], pocRoutes);

// interactions
router.use(
  "/leads/interactions",
  authMiddleware.isAuthenticated,
  interactionRoutes
);

// orders
router.use("/leads/orders", authMiddleware.isAuthenticated, orderRoutes);

// leads
router.use("/leads", authMiddleware.isAuthenticated, leadRoutes);

module.exports = router;

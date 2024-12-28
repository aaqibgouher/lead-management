const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

// get all orders
router.get("/", orderController.getOrders);

// add order
router.post("/", orderController.addOrder);

// top performing leads
router.get("/top-performing-leads", orderController.getTopPerformingLeads);

module.exports = router;

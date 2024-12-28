const express = require("express");
const router = express.Router();
const interactionController = require("../controller/interactionController");

// get all interactions by lead
router.get("/", interactionController.getInteractions);

// add interaction to lead
router.post("/", interactionController.addInteraction);

// get interaction by id
router.get("/:interactionId", interactionController.getInteraction);

// update interaction by id
router.put("/:interactionId", interactionController.updateInteraction);

// delete interaction by id
router.delete("/:interactionId", interactionController.deleteInteraction);

module.exports = router;

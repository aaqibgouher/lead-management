const express = require("express");
const router = express.Router();
const pocController = require("../controller/pocController");

// get all pocs by lead
router.get("/", pocController.getPocs);

// add poc to lead
router.post("/", pocController.addPoc);

// get poc by id
router.get("/:pocId", pocController.getPoc);

// update poc by id
router.put("/:pocId", pocController.updatePoc);

// delete lead by id
router.delete("/:pocId", pocController.deletePoc);

module.exports = router;

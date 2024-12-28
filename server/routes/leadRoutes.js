const express = require("express");
const router = express.Router();
const leadController = require("../controller/leadControler");

// get all leads
router.get("/", leadController.getLeads);

// get all today's leads
router.get("/today", leadController.getLeadsToCallToday);

// total leads, pocs & interactions
router.get("/stats", leadController.getTotalCount);

// add lead
router.post("/", leadController.addLead);

// get lead by id
router.get("/:leadId", leadController.getLead);

// update lead by id
router.put("/:leadId", leadController.updateLead);

// delete lead by id
router.delete("/:leadId", leadController.deleteLead);

module.exports = router;

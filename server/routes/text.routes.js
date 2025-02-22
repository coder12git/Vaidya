// routes for sms
// Routes for sms
const express = require("express");
const textController = require("../controllers/text.controller");

const router = express.Router();

// POST /sms
router.post("/", textController.post);

module.exports = router;

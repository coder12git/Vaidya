// Routes for voice
const express = require("express");
const callController = require("../controllers/call.controller");
const langController = require("../controllers/language.controller");

const router = express.Router();

// POST /voice
// router.post("/", langController.languageSelection);
// // POST /voice/respond
// router.post("/select-language", langController.selectLanguage);
// router.post("/post", callController.post);
// router.post("/handle-keypress", callController.handleKeyPress);
// router.post("/get-location", callController.getNearbyHospitals);
// router.post("/respond", callController.respond);

module.exports = router;


// For multilingual support
// Default - language selection
// After this redirects to select language route
// This will redired to /main-menu route, where user will be asked  questions in their prefer language
// /handle-keypress to get the key user pressed(1,2,3,4)
// /get-location to get neraby hospitals/doctors for button 2
// /respond for general response i.e symptom related queries for button 4
// for 1 and 3, no end point directly establish the call and then end with thanks message - call ended.
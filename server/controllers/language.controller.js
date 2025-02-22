// Multilingual support ( English, Hindi, Bengali )
// phone call in user prefer language
// make received sms in user prefer language

const { VoiceResponse } = require("twilio").twiml;

// Ask user for language selection (/voice/select-language)
const languageSelection = async (req, res) => {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      numDigits: 1,
      action: "/voice/select-language",
      method: "POST",
      timeout: 5,
    });
    gather.say("Hello! Welcome to Sahayak, your personal medical assistant.");
    gather.pause();
    gather.say("For English, press 1. हिंदी के लिए 2 दबाएं.");

    console.log("VOICE BOT SAYS: " + gather.toString() + "\n");

    res.type("text/xml").send(twiml.toString());
  };

// Process language selection and redirect to /voice route
const selectLanguage = async (req, res) => {
    const twiml = new VoiceResponse();
    const userChoice = req.body.Digits;
    let lang = "en"; // Default English
  
    switch (userChoice) {
      case "1":
        lang = "en";
        twiml.say("You have selected English.");
        twiml.redirect(`/voice/post?lang=${lang}`);
        break;
      case "2":
        lang = "hi";
        twiml.say("आपने हिंदी चुनी है।");
        twiml.redirect(`/voice/post?lang=${lang}`);
        break;
      // bengali not supported in free version
      // case "3":
      //   lang = "bn";
      //   twiml.say("আপনি বাংলা নির্বাচন করেছেন।");
      //   twiml.redirect(`/voice/post?lang=${lang}`);
      //   break;
      default:
        twiml.say("Invalid selection. Please try again.");
        twiml.redirect("/voice");
    }
    
    res.type("text/xml").send(twiml.toString());
  };


module.exports = {
    languageSelection,
    selectLanguage,
}
  
// Voice interaction
// Controllers for voice routes
const twilio = require("twilio");
const { VoiceResponse } = require("twilio").twiml;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const genAI = new GoogleGenerativeAI(process.env.GPT_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Twilio config
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const systemPrompt = `
You are a strict medical assistant who must respond exclusively in the language in which the user communicates. 
If the user asks their question in English, or Hindi, your entire answer must be in that language only—do not mix languages or revert to another language. 
✅ You ONLY respond to health and symptom-related queries.
❌ You DO NOT answer general knowledge, technical, or unrelated questions.
✅ If a query is not related to health, respond with the following message in the user's language:
  - English: "I can only assist with medical-related questions."
  - Hindi: "मैं केवल चिकित्सा-संबंधित प्रश्नों में सहायता कर सकता हूँ।"
✅ DO NOT diagnose illnesses—only provide general guidance.
✅ Provide structured responses in this format:
  - Possible Causes:
  - What You Can Do:
  - Important
✅ Always advise users to consult a doctor for medical concerns.
Keep responses clear and under 5 sentences.
`;

// func to send sms after call
async function sendSMS(user, message) {
  try {
    const formattedMessage = `
    
    📢 Sahayak – Your Personal Medical Assistant 🏥

    📝 Here are the details from your recent conversation:
    
    ${message}
    
    ⚠️ Reminder: This is general guidance. Always consult a doctor for serious concerns.
    
    📞 Need more help? Call us again.
    
    🙏 Thank you for using Sahayak! Stay healthy. 😊`;

    await twilioClient.messages.create({
      body: formattedMessage,
      from: TWILIO_PHONE_NUMBER,
      to: user,
    });
    console.log(`SMS Sent to ${user}`);
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
}

// Function to ask user to press diff no for different responses, during call
// Press 1 - Connect to emergency sos
// Press 2 - Find nearby doctors and hospitals
// Press 3 - connect to a real doctor
// Press 4 - For general symptom related queries
// Rest buttons after phase 2 features for multiligual support and medicine reminders



// Initial post
const post = async (req, res) => {
  const twiml = new VoiceResponse();
  const lang = req.query.lang || "en";

  const translations = {
    en: {
      welcome: "Hello! Welcome to Sahayak, your personal medical assistant.",
      menu: "Press 1 for emergency services, Press 2 to find nearby hospitals, Press 3 to connect with a doctor, Press 4 for general symptom queries.",
    },
    hi: {
      welcome: "सहायक में आपका स्वागत है, आपका निजी चिकित्सा सहायक।",
      menu: "आपातकालीन सेवाओं के लिए 1 दबाएं, नजदीकी अस्पताल खोजने के लिए 2, डॉक्टर से संपर्क के लिए 3, सामान्य लक्षण प्रश्नों के लिए 4 दबाएं।",
    },
    bn: {
      welcome: "সাহায়কে আপনাকে স্বাগতম, আপনার ব্যক্তিগত চিকিৎসা সহকারী।",
      menu: "জরুরি সেবার জন্য 1, নিকটবর্তী হাসপাতাল খুঁজতে 2, ডাক্তার সংযোগের জন্য 3, সাধারণ লক্ষণ প্রশ্নের জন্য 4 চাপুন।",
    },
  }

  const messages = translations[lang];

  const gather = twiml.gather({
    numDigits: 1,
    action: `/voice/handle-keypress?lang=${lang}`,
    method: "POST",
  });

  // Welcome message
  gather.say(messages.welcome);
  gather.pause();
  // Key presses
  gather.say(messages.menu);

  console.log("VOICE BOT SAYS: " + gather.toString() + "\n");
  res.type("text/xml").send(twiml.toString());
};
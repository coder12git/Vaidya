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
You are a strict medical assistant. 
✅ You ONLY respond to health and symptom-related queries.
❌ You DO NOT answer general knowledge, technical, or unrelated questions.
✅ If a query is not related to health, respond with: "I can only assist with medical-related questions."
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

// Function to handle keypress
const handleKeyPress = async (req, res) => {
  const twiml = new VoiceResponse();
  const lang = req.query.lang || "en";
  const userChoice = req.body.Digits;
  const userPhoneNo = req.body.From;

  const translations = {
    en: {
      emergency: "You requested emergency services. Connecting you now.",
      emergencyThanks: "We hope your consultation was helpful. If you need a follow-up or have any concerns, don't hesitate to contact us. Thank you for using Sahayak. Take care!",
      location: "Please say your location, like a city, neighborhood, or landmark.",
      doctor: "You requested to connect with a doctor. Please stay on the line while we connect your call.",
      doctorThanks: "We hope your consultation was helpful. If you need a follow-up or have any concerns, don't hesitate to contact us. Thank you for using Sahayak. Take care!",
      symptom: "You can ask me about symptoms. Please describe your symptoms after the beep.",
      invalid: "Invalid selection. Please try again."
    },
    hi: {
      emergency: "आपने आपातकालीन सेवाओं का अनुरोध किया है। आपको अभी कनेक्ट किया जा रहा है।",
      emergencyThanks: "हमें आशा है कि आपकी सलाह उपयोगी रही। यदि आपको आगे की सहायता या कोई चिंता हो, तो कृपया हमसे संपर्क करें। सहायक का उपयोग करने के लिए धन्यवाद। ध्यान रखें!",
      location: "कृपया अपना स्थान बताएं, जैसे शहर, इलाका, या कोई प्रसिद्ध स्थान।",
      doctor: "आपने डॉक्टर से जुड़ने का अनुरोध किया है। कृपया कॉल पर बने रहें, हम आपकी कॉल कनेक्ट कर रहे हैं।",
      doctorThanks: "हमें आशा है कि आपकी सलाह उपयोगी रही। यदि आपको आगे की सहायता या कोई चिंता हो, तो कृपया हमसे संपर्क करें। सहायक का उपयोग करने के लिए धन्यवाद। ध्यान रखें!",
      symptom: "आप मुझसे लक्षणों के बारे में पूछ सकते हैं। कृपया बीप के बाद अपने लक्षण बताएं।",
      invalid: "अमान्य चयन। कृपया पुनः प्रयास करें।"
    },
    bn: {
      emergency: "আপনি জরুরি পরিষেবা অনুরোধ করেছেন। আপনাকে এখন সংযোগ করা হচ্ছে।",
      emergencyThanks: "আমরা আশা করি আপনার পরামর্শ সহায়ক হয়েছে। যদি আপনি ফলো-আপ বা অন্য কোনো বিষয়ে সহায়তা প্রয়োজন মনে করেন, তবে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। সাহায়ক ব্যবহার করার জন্য ধন্যবাদ। সাবধানে থাকুন!",
      location: "অনুগ্রহ করে আপনার অবস্থান বলুন, যেমন শহর, পাড়া, বা একটি পরিচিত স্থান।",
      doctor: "আপনি একজন ডাক্তারের সাথে সংযোগ করার অনুরোধ করেছেন। অনুগ্রহ করে কল চালু রাখুন, আমরা আপনার কল সংযুক্ত করছি।",
      doctorThanks: "আমরা আশা করি আপনার পরামর্শ সহায়ক হয়েছে। যদি আপনি ফলো-আপ বা অন্য কোনো বিষয়ে সহায়তা প্রয়োজন মনে করেন, তবে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। সাহায়ক ব্যবহার করার জন্য ধন্যবাদ। সাবধানে থাকুন!",
      symptom: "আপনি আমার সাথে লক্ষণের বিষয়ে কথা বলতে পারেন। অনুগ্রহ করে বিপের পরে আপনার লক্ষণগুলি বর্ণনা করুন।",
      invalid: "অবৈধ নির্বাচন। অনুগ্রহ করে আবার চেষ্টা করুন।"
    }
  }

  const messages = translations[lang];

  switch (userChoice) {
    case "1":
      //Emergency SOS (need thanks message here!!)
      twiml.say(messages.emergency);
      const dial = twiml.dial({
        timeout: 20, //20 sec
        callerId: process.env.TWILIO_PHONE_NUMBER,
      });
      const emergNo = process.env.EMERGENCY_NUMBER;
      dial.number(emergNo);

      twiml.say(messages.emergencyThanks);
      break;

    case "2":
      //Find Nearby Hospitals & Doctors
      const gather = twiml.gather({
        speechTimeout: auto,
        speechModel: "phone_call",
        input: "speech",
        action: `/voice/get-location?lang=${lang}`,
        method: "POST",
      });
      gather.say(messages.location);
      break;
    case "3":
      //Connect to a real doctor ((need thanks message here!!))
      twiml.say(messages.doctor);
      const dialNo = twiml.dial({
        timeout: 20, //20 sec
        callerId: process.env.TWILIO_PHONE_NUMBER,
      });
      const docNumb = process.env.DOCTOR_NUMBER;
      dialNo.number(docNumb);

      twiml.say(messages.doctorThanks);

      break;

    case "4":
      // AI Symptom Checker
      twiml.say(messages.symptom);
      twiml.record({ action: `/voice/respond?lang=${lang}`, method: "POST", maxLength: 30, transcribe: true });
      break;

    default:
      twiml.say(messages.invalid);
      twiml.redirect(`/voice/post?lang=${lang}`);
  }

  res.type("text/xml").send(twiml.toString());
};

// Function to find nearby hospitals and doctors list using google maps places api
const getNearbyHospitals = async (req, res) => {
  const twiml = new VoiceResponse();
  const lang = req.query.lang || "en";
  const userLocation = req.body["SpeechResult"];
  const userPhoneNo = req.body.From;

  const hospTranslations = {
    en: {
      locationError: "I couldn't understand your location. Please try again.",
      notFound: (loc) => `I couldn't find any hospitals near ${loc}. Please try again.`,
      topHospitals: "Here are the top hospitals near you: \n",
      detailsSent: "I've also sent you the details via SMS. Thank you for using Sahayak. Take care!",
      errorMes: "I encountered an issue finding hospitals. Please try again later."
    },
    hi: {
      locationError: "मुझे आपका स्थान समझ में नहीं आया। कृपया पुनः प्रयास करें।",
      notFound: (loc) => `मैं ${loc} के नजदीक कोई अस्पताल नहीं खोज पाया। कृपया पुनः प्रयास करें।`,
      topHospitals: "आपके नजदीकी शीर्ष अस्पताल ये हैं: \n",
      detailsSent: "मैंने आपको एसएमएस के माध्यम से विवरण भी भेज दिया है। सहायक का उपयोग करने के लिए धन्यवाद। सुरक्षित रहें!",
      errorMes: "मुझे अस्पताल खोजने में समस्या आई है। कृपया बाद में पुनः प्रयास करें।"
    },
    bn: {
      locationError: "আমি আপনার অবস্থান বুঝতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।",
      notFound: (loc) => `আমি ${loc} এর কাছাকাছি কোনো হাসপাতাল খুঁজে পাইনি। অনুগ্রহ করে আবার চেষ্টা করুন।`,
      topHospitals: "আপনার নিকটবর্তী শীর্ষ হাসপাতালগুলি হলো: \n",
      detailsSent: "আমি আপনাকে এসএমএস এর মাধ্যমে বিস্তারিত পাঠিয়ে দিয়েছি। সাহায়ক ব্যবহার করার জন্য ধন্যবাদ। নিরাপদ থাকুন!",
      errorMes: "আমি হাসপাতাল খুঁজে পেতে সমস্যা সম্মুখীন হয়েছি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।"
    }
  };

  const hospMessages = hospTranslations[lang];

  if (!userLocation) {
    twiml.say(hospMessages.locationError);
    twiml.hangup();
    return res.type("text/xml").send(twiml.toString());
  }

  console.log("User Location:", userLocation);
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const googleMapsUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospitals+near+${encodeURIComponent(userLocation)}&key=${apiKey}`;

    const response = await axios.get(googleMapsUrl);
    const results = response.data.results.slice(0, 1); // Get top 3 results (keeping short for hackathon)

    if (!results.length) {
      twiml.say(hospMessages.notFound(userLocation));
      twiml.hangup();
      return res.type("text/xml").send(twiml.toString());
    }

    const hospitalDetails = [];
    for (const [index, result] of results.entries()) {
      const placeId = result.place_id;
      const fetchPhoneNoURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_phone_number,formatted_address&key=${apiKey}`;
      const detailRes = await axios.get(fetchPhoneNoURL);
      const info = `
      🏥 Hospital ${index + 1}:

      📌 Name: ${detailRes.data.result.name}
      📍 Address: ${detailRes.data.result.formatted_address}
      📞 Contact: ${detailRes.data.result.formatted_phone_number || "Not available"}\n`;

      hospitalDetails.push(info);
    }

    let message = hospMessages.topHospitals;
    message += hospitalDetails.join(" ");
    // Speak results on call
    twiml.say(message);
    console.log("AI response for Nearby Hospitals & Doctors: " + hospitalDetails);
    twiml.pause();
    twiml.say(hospMessages.detailsSent);

    twiml.hangup();
    res.type("text/xml").send(twiml.toString());

    // Send SMS of nearby hospitals
    await sendSMS(userPhoneNo, message);

  } catch (error) {
    console.error(`Error fetching hospitals: ${error.message}`);
    twiml.say(hospMessages.errorMes);
    twiml.hangup();
    res.type("text/xml").send(twiml.toString());
  }
};

// Symptom related queries for button 4
const respond = async (req, res) => {
  const twiml = new VoiceResponse();
  const lang = req.query.lang || "en";
  const userPhoneNo = req.body.From;
  const prompt = req.body["SpeechResult"];

  console.log("Twilio Request Body:", req.body);


  // Translations for symptom query responses
  const symptomTranslations = {
    en: {
      empty: "I didn't catch that. Please try again.",
      det: "I've also sent you the details via SMS.",
      final: "I hope this was helpful. Remember, I provide general guidance, but always consult a doctor for serious concerns. Thank you for using Sahayak. Take care!",
      err: "I'm sorry, but I'm having trouble processing your request. Please try again later or consult a doctor for assistance"
    },
    hi: {
      empty: "मैं आपकी बात नहीं सुन पाया। कृपया पुनः प्रयास करें।",
      det: "मैंने आपको एसएमएस के माध्यम से विवरण भी भेज दिया है।",
      final: "मुझे उम्मीद है कि यह सहायक रहा। याद रखें, मैं केवल सामान्य मार्गदर्शन प्रदान करता हूँ, गंभीर मामलों के लिए हमेशा डॉक्टर से संपर्क करें। सहायक का उपयोग करने के लिए धन्यवाद। सुरक्षित रहें!",
      err: "मुझे खेद है, लेकिन मैं आपकी अनुरोध को संसाधित करने में समस्या का सामना कर रहा हूँ। कृपया बाद में पुनः प्रयास करें या सहायता के लिए किसी डॉक्टर से संपर्क करें।"
    },
    bn: {
      empty: "আমি আপনার কথা বুঝতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।",
      det: "আমি আপনাকে এসএমএস এর মাধ্যমে বিস্তারিত পাঠিয়ে দিয়েছি।",
      final: "আমি আশা করি এটি সহায়ক ছিল। মনে রাখবেন, আমি শুধুমাত্র সাধারণ নির্দেশিকা প্রদান করি, গুরুতর সমস্যার জন্য সর্বদা ডাক্তারকে পরামর্শ দিন। সাহায়ক ব্যবহার করার জন্য ধন্যবাদ। নিরাপদ থাকুন!",
      err: "আমি দুঃখিত, কিন্তু আমি আপনার অনুরোধ প্রক্রিয়া করতে সমস্যা পাচ্ছি। অনুগ্রহ করে পরে আবার চেষ্টা করুন অথবা সহায়তার জন্য একজন ডাক্তারকে পরামর্শ করুন।"
    }
  };

  const symptomMes = symptomTranslations[lang];

  // here we need a function for empty prompts - need to find that logic.

  console.log("USER ASKED: " + prompt + "\n");

  try {
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\nUser: ${prompt}` }] }
      ]
    });

    const response = await result.response;
    const aiReply = response.text();

    twiml.say(aiReply);
    console.log("General AI RESPONSE ( for general symptom related queries): " + aiReply);

    twiml.pause();
    twiml.say(symptomMes.det);
    twiml.say(symptomMes.final);
    twiml.hangup();

    res.type("text/xml").send(twiml.toString());

    // send sms to user with the details after call
    await sendSMS(userPhoneNo, aiReply);

  } catch (error) {
    console.error(`Error with Gemini API request: ${error.message}`);
    twiml.say(symptomMes.err);
    twiml.hangup();
    res.type("text/xml").send(twiml.toString());
  }
};

module.exports = {
  post,
  respond,
  handleKeyPress,
  getNearbyHospitals,
};

// Sharing the call details via sms - done, need more refining later
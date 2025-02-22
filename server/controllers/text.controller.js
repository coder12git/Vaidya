// Sms interaction
// Controllers for SMS routes

const { MessagingResponse } = require("twilio").twiml;
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GPT_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

const post = async (req, res) => {
  const twiml = new MessagingResponse();
  const userRequest = req.body.Body || "";

  if (userRequest.trim().length === 0) {
    twiml.message("Please enter a valid symptom-related query.");
    return res.type("text/xml").send(twiml.toString());
  }

  try {
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\nUser: ${userRequest}` }] }
      ]
    });

    const response = await result.response;
    const aiReply = response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process your request. Please try again.";

    const formattedMessage = `

    📢 Sahayak – Your Personal Medical Assistant 🏥

    📝 Here’s what you need to know about your concern:

    ${aiReply}

    ⚠️ This is general guidance. Always seek medical advice for serious concerns.

    📞 Need more help? Call us anytime.

    🙏 Thank you for using Sahayak! Stay healthy. 😊


    `;
    
    twiml.message(formattedMessage);
    console.log("User:", userRequest);
    console.log("AI Response:", formattedMessage);

    res.type("text/xml").send(twiml.toString());
  } catch (error) {
    console.error("Error with Gemini API request:", error.message);
    twiml.message("An error occurred while processing your request. Please try again later.");
    res.type("text/xml").send(twiml.toString());
  }
};

module.exports = {
  post,
};

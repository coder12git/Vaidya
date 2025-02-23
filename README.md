
<div align='center'>
   
![image](https://github.com/HackForge-JUSL/Four_climb/assets/108334168/4d05bf31-8237-435a-8ed8-76c267bb613b)


<br>

![Screenshot 2025-02-23 091532](https://github.com/user-attachments/assets/3cf5538e-01a5-48eb-ac11-71d4d3e1f771)


An AI-based medical assistant that works without the internet, accessible via a simple phone call.

Watch Demo Video - <a href='[https://youtu.be/GyAh_ADMFKA](https://youtu.be/9PLBbNzp2XA?si=P__Z80o56j7gX9Sb)'>Click here</a>

Backend deploy server link - https://vaidya-gamma.vercel.app/

To use our app, send an sms or voice call on this number - `+19283796252`
   
</div>

## Project Overview
Millions of people, especially in low-resource settings, struggle to access timely and reliable medical guidance due to language barriers, lack of internet connectivity, and limited access to smart devices. In emergencies and routine health queries alike, users need immediate, understandable, and trustworthy advice that traditional systems often fail to provide.

Globally, over 3.7 billion people still do not have internet access (ITU estimates).
In India, despite rapid digital growth, more than 700 million people remain offline, limiting access to digital health resources.
In many low-resource settings, the shortage of medical professionals is stark.
Approximately 40% of the world's population speaks a language underrepresented online, meaning many digital health tools aren't available in their native language. 

## Features
Voice-Based AI Assistance:
Sahayak uses programmable voice to offer a fully voice-activated interface that works even on basic phones, without internet.
Multilingual Support:
Users can select their preferred language (English, Hindi, etc) at the start of the call, ensuring that all communication - including symptom queries and first-aid instructions, is delivered in their language.
Integrated Medical Guidance:
Leveraging the Gemini API , Sahayak provides real-time general medical guidance for symptom-related queries while strictly avoiding diagnoses.
Emergency & Direct Connectivity:
The system not only offers first-aid instructions for common emergencies (e.g., burns, cuts, fever, dehydration) but also connects users directly to doctors or emergency services if needed.
Location-Based Services:
With integrated Google Maps API, Sahayak can quickly find nearby hospitals and clinics and send details (name, address, phone number) via SMS.
SMS Support:
All guidance and details are also sent via SMS, ensuring users have a permanent record of their medical advice - even if they miss the voice call.


## How It Works
![image](https://github.com/user-attachments/assets/6067993a-1e34-4294-b742-4d7219abc374)


## Technology Stack
- **Node.js and Express** – For building our ( backend )server.
- **Twilio Programmable Voice & Messaging** –  For voice calls, DTMF input handling, and sending SMS messages.
- **Google Generative AI (Gemini API)** – To generate AI-driven medical guidance responses.
- **Google Places API** – To fetch nearby hospital and clinic details based on location.
- **Ngrok** – For exposing the local development server to the internet during testing.
- **React.js** –For building our webpage ( frontend )

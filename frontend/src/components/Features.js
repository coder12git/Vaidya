import React from "react";
import "../styles/Features.css";
import { FaPhoneAlt, FaLanguage, FaHospital, FaUserMd } from "react-icons/fa";
import { GiArtificialIntelligence, GiFirstAidKit } from "react-icons/gi";

const Features = () => {
  return (
    <section className="features" id="features">
      <h2>Key Features</h2>
      <p className="features-description">
        Sahayak provides instant medical assistance through calls and messages, ensuring seamless emergency connectivity.
      </p>
      <div className="feature-cards">
        <div className="feature">
          <FaPhoneAlt className="icon" />
          <h3>Voice & SMS-Based AI Assistance</h3>
          <p>Access real-time medical help through voice commands and receive SMS guidance for offline access.</p>
        </div>
        <div className="feature">
          <FaUserMd className="icon" />
          <h3>Doctor Connectivity</h3>
          <p>Directly connect with doctors via automated call dialing for professional medical advice.</p>
        </div>
        <div className="feature">
          <FaHospital className="icon" />
          <h3>Nearby Hospital Finder</h3>
          <p>Locate hospitals and receive SMS details using Google Maps API for quick access.</p>
        </div>
        <div className="feature">
          <GiFirstAidKit className="icon" />
          <h3>Emergency First Aid</h3>
          <p>Get life-saving first-aid guidance for burns, fever, dehydration, and other emergencies.</p>
        </div>
        <div className="feature">
          <FaLanguage className="icon" />
          <h3>Multilingual Support</h3>
          <p>Interact in your preferred language (English, Hindi, etc.) for better accessibility and understanding.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;

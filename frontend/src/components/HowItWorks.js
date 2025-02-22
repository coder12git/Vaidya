import React from "react";
import { FaPhoneAlt, FaCog, FaListAlt, FaCommentDots, FaCheckCircle } from "react-icons/fa";

import "../styles/HowItWorks.css";


const steps = [
  { icon: <FaPhoneAlt />, title: "User Calls or Sends SMS", desc: "User calls or texts, selects language, and retries invalid choices for smooth interaction." },
  { icon: <FaCog />, title: "Query Processing to go menu", desc: "System processes SMS or voice queries, transitioning users to the main menu options." },
  { icon: <FaListAlt />, title: "Main Menu Options to select", desc: "Users choose Emergency SOS, doctor connection, hospital locations, or symptom queries via API." },
  { icon: <FaCommentDots />, title: "Guidance and Support", desc: "Provides guidance via SMS or voice, handling emergencies and invalid choices with retries." },
  { icon: <FaCheckCircle />, title: "Wrap Up and ratings-feedback", desc: "Ends interaction with a thank-you message, ensuring users receive seamless helpful support." }
];


const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <h2>How It Works</h2>
      <p>See how our system assists users via calls & SMS.</p>
      <div className="steps-container">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="step-card">
              <div className="icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="arrow">
                <svg
                  viewBox="0 0 100 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-svg"
                >
                  <path d="M10 25 C40 5, 60 5, 90 25" stroke="#4A90E2" strokeWidth="5" fill="none" strokeLinecap="round"/>
                  <path d="M85 20 L95 25 L85 30" stroke="#4A90E2" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;


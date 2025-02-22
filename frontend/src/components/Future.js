import React from "react";
import { FaNotesMedical, FaMoneyBillWave, FaHandsHelping } from "react-icons/fa";
import "../styles/Features.css";

const Features = () => {
  return (
    <section className="features" id="future">
      <h2>Monetization Strategies</h2>
      <p className="features-description">
        Sahayak generates revenue through subscriptions, healthcare partnerships, and government/NGO funding.
      </p>
      <div className="feature-cards">
        
        <div className="feature">
          <FaNotesMedical className="icon" />
          <h3>Subscription-Based Model</h3>
          <ul>
            <li>Premium features like personalized health plans & medicine reminders.</li>
            <li>Set reminders by saying the medicine name, dosage, and time.</li>
          </ul>
        </div>

        <div className="feature">
          <FaMoneyBillWave className="icon" />
          <h3>Partnerships with Healthcare Providers</h3>
          <ul>
            <li>Earn referral fees by directing users to partner hospitals.</li>
            <li>Charge providers for top search rankings in nearby hospitals.</li>
          </ul>
        </div>

        <div className="feature">
          <FaHandsHelping className="icon" />
          <h3>Government & NGO Funding</h3>
          <ul>
            <li>Secure grants to deploy Sahayak in underserved areas.</li>
            <li>Partner with governments to offer free or low-cost services.</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Features;

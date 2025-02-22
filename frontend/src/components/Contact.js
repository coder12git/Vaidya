import React from "react";
import "../styles/Contact.css";
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="contact-section" id="contact">
      <h2>Connect with Us</h2>
      <p>Connect Your number with us such that You can be benifiited by this medical Assistant!</p>

      <div className="contact-container">
        <form className="contact-form">
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="Your Name" required />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Your Email" required />
          </div>

          <div className="input-group">
            <FaPhone className="icon" />
            <input type="tel" placeholder="Your Phone Number" required />
          </div>

          <button type="submit" className="send-btn">
           Connect Number<FaPaperPlane />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;

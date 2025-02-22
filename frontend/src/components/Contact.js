import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Contact.css";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload

    // Show success notification
    toast.info("Thanks for sharing your details! We'll connect your number shortly and notify you via SMS.", {
      position: "top-right",
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <section className="contact-section" id="contact">
      <h2>Connect with Us</h2>
      <p>Connect your number with us so that you can benefit from this medical assistant!</p>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
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
            Connect Number <FaPaperPlane />
          </button>
        </form>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer style={{ top: '130px' }}/>
    </section>
  );
};

export default ContactUs;


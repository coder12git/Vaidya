import React, { useState } from "react";
import "../styles/FAQ.css";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How does Sahayak provide medical assistance?",
    answer: "Sahayak connects users with medical support through Twilio calls and SMS. Users can call our provided number, and our system processes the request to provide necessary medical guidance or nearby hospital details."
  },
  {
    question: "Is Sahayak available 24/7?",
    answer: "Yes! Sahayak operates 24/7 to ensure users can get medical assistance anytime they need it."
  },
  {
    question: "Do I need an internet connection to use this service?",
    answer: "No, Sahayak works through phone calls and SMS, so you don’t need an internet connection to get medical assistance."
  },
  {
    question: "Can I get emergency hospital details via SMS?",
    answer: "Absolutely! Once you request assistance, Sahayak can send details of the nearest hospitals via SMS."
  },
  {
    question: "Is this service free to use?",
    answer: "Yes, the service is free, but carrier charges for calls or SMS may apply based on your telecom provider."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="FAQ">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <FaChevronDown className={`arrow ${openIndex === index ? "rotate" : ""}`} />
            </div>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

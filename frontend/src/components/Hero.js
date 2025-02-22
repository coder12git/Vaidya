import React from "react";
import "../styles/Hero.css";
import medicalVideo from "../assets/Medical3.mp4";

const Hero = () => {
  return (
    <section className="hero" id="Hero">
     
        <div className="hero-content">
          <h1>Your Medical Assistant, Anytime</h1>
          <p>Get instant medical help via call & SMS with Sahayak.</p>
          <a href="tel:+1234567890">
            <button className="cta-button">Call Assistance    (+1234567890)</button>
          </a>
        </div>
        <div className="hero-video">
          <video src={medicalVideo} autoPlay loop muted playsInline className="video" />
        </div>
 
    </section>
  );
};

export default Hero;

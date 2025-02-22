import React from "react";
import "../styles/Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
       

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sahayak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

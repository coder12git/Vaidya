import React, { useState } from "react";
import "../styles/Header.css";
import { FaBars } from "react-icons/fa"; // Import hamburger icon
import image from "../assets/Sahayak3.png"


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={image} alt=" Logo" className="logo-img" />
        <span className="logo-text">Sahayak</span>
      </div>

      {/* Desktop Navigation */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#Hero">About</a>
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#flowchart">Flowchart</a>
        <a href="#video">Demo Video</a>
        <a href="#FAQ">FAQ</a>
        <a href="#contact">Contact</a>
        <a href="#Team">About Team</a>
      </nav>

      {/* Hamburger Menu Button */}
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>
    </header>
  );
};

export default Header;
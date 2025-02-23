import React from "react";
import "../styles/DashboardHeader.css"; // Separate CSS file for dashboard header
import image from "../assets/Sahayak3.png";

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="logo-container">
        <img src={image} alt="Logo" className="logo-img" />
      </div>
    </header>
  );
};

export default DashboardHeader;

import React from "react";
import "../styles/Dashboard.css";
import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";
const Dashboard = () => {
  const callLogs = [
    {
      dateTime: "Feb 22, 2025 10:15",
      phoneNumber: "+91XXXXXXXXXX",
      serviceType: "Emergency",
      duration: "00:45",
      responseSummary: "Connecting you now...",
    },
    {
      dateTime: "Feb 22, 2025 10:30",
      phoneNumber: "+91XXXXXXXXXX",
      serviceType: "Hospital Search",
      duration: "01:20",
      responseSummary: "Top hospitals near you: Apollo Hospital, ...",
    },
    {
      dateTime: "Feb 22, 2025 10:45",
      phoneNumber: "+91XXXXXXXXXX",
      serviceType: "Doctor Connection",
      duration: "00:50",
      responseSummary: "Connecting you to a doctor...",
    },
    {
      dateTime: "Feb 22, 2025 11:00",
      phoneNumber: "+91XXXXXXXXXX",
      serviceType: "Symptom Query",
      duration: "01:10",
      responseSummary: "Possible Causes: Stress, dehydration, etc.",
    },
  ];

  return (
    <div>
    <DashboardHeader />
    <div className="dashboard-container">
     <h2>Welcome ! </h2>

     <h5>Here is Your call and SMS Details</h5>

      <h2>Call Logs & SMS Dashboard</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Phone Number</th>
            <th>Service Type</th>
            <th>Duration</th>
            <th>Response Summary</th>
          </tr>
        </thead>
        <tbody>
          {callLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.dateTime}</td>
              <td>{log.phoneNumber}</td>
              <td>{log.serviceType}</td>
              <td>{log.duration}</td>
              <td>{log.responseSummary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
};

export default Dashboard;

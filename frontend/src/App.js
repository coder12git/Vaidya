import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Team from "./components/Team";
import VideoDemo from "./components/VideoDemo";
import Flowchart from "./components/Flowchart";
import Footer from "./components/Footer";
import Future from "./components/Future";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <> 
              <Header />
              <Hero />
              <Features />
              <HowItWorks />
              <Flowchart />
              <Future />
              <VideoDemo />
              <FAQ />
              <Contact />
              <Team />
              <Footer />
            </>
          }/>

          {/* Dashboard Page */}
          <Route path="/dashboard" element={  <Dashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

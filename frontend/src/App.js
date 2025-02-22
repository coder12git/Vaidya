import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Contact from "./components/Contact";
import "./App.css";
import FAQ from "./components/FAQ";
import Team from "./components/Team";
import VideoDemo from "./components/VideoDemo";
import Flowchart from "./components/Flowchart";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Flowchart/>
      <VideoDemo/>
      <FAQ/>
      <Contact />
      <Team/>
    </div>
  );
}

export default App;

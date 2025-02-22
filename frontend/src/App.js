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
import Footer from "./components/Footer";
import Future from "./components/Future";
function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Flowchart/>
      <Future/>
      <VideoDemo/>
      <FAQ/>
      <Contact />
      <Team/>
      <Footer />
    </div>
  );
}

export default App;

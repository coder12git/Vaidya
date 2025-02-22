import React, { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import "../styles/Flowchart.css";
import flowchartpng from "../assets/flowchart.png";

const nodeStyle = {
  width: 200,
  padding: 10,
  borderRadius: "10px",
  textAlign: "center",
  fontSize: "14px",
  fontFamily: "monospace",
  background: "#5072A7",
  color: "white ",
  border: "2px solid white",
};

const initialNodes = [
  { id: "1", type: "input", data: { label: "📞 User Calls Twilio Number" }, position: { x: 600, y: 0 }, style: nodeStyle },
  { id: "2", data: { label: "🌐 Language Selection" }, position: { x: 600, y: 100 }, style: nodeStyle },
  { id: "3", data: { label: "🇬🇧 English Selected (Press 1)" }, position: { x: 400, y: 200 }, style: nodeStyle },
  { id: "4", data: { label: "🇮🇳 Hindi Selected (Press 2)" }, position: { x: 800, y: 200 }, style: nodeStyle },
  { id: "5", data: { label: "❌ Invalid Language (Try Again)" }, position: { x: 600, y: 200 }, style: nodeStyle },
  { id: "6", data: { label: "📋 Main Menu" }, position: { x: 600, y: 300 }, style: nodeStyle },

  // Main Menu Options
  { id: "7", data: { label: "🚨 Emergency SOS (Press 1)" }, position: { x: 200, y: 400 }, style: nodeStyle },
  { id: "8", data: { label: "👨‍⚕️ Connect with Doctor (Press 3)" }, position: { x: 600, y: 400 }, style: nodeStyle },
  { id: "9", data: { label: "🏥 Find Nearby Hospitals (Press 2)" }, position: { x: 1000, y: 400 }, style: nodeStyle },
  { id: "10", data: { label: "❓ General Symptom Queries (Press 4)" }, position: { x: 1400, y: 400 }, style: nodeStyle },

  // Emergency SOS Flow
  { id: "11", data: { label: "📢 Speak Emergency Message" }, position: { x: 200, y: 500 }, style: nodeStyle },
  { id: "12", data: { label: "📞 Auto Dial Emergency Number" }, position: { x: 200, y: 600 }, style: nodeStyle },
  { id: "13", data: { label: "✅ Play Thank You Message" }, position: { x: 200, y: 700 }, style: nodeStyle },
  { id: "14", data: { label: "🔚 End Call" }, position: { x: 200, y: 800 }, style: nodeStyle },

  // Connect with Doctor Flow
  { id: "15", data: { label: "📢 Announce Connection" }, position: { x: 600, y: 500 }, style: nodeStyle },
  { id: "16", data: { label: "📞 Dial Doctor's Number" }, position: { x: 600, y: 600 }, style: nodeStyle },

  // Find Nearby Hospitals Flow
  { id: "17", data: { label: "📍 Prompt for Location" }, position: { x: 1000, y: 500 }, style: nodeStyle },
  { id: "18", data: { label: "🔎 Query Google Places API" }, position: { x: 1000, y: 600 }, style: nodeStyle },
  { id: "19", data: { label: "📜 Process Top Results" }, position: { x: 1000, y: 700 }, style: nodeStyle },
  { id: "20", data: { label: "📢 Speak Details" }, position: { x: 1000, y: 800 }, style: nodeStyle },
  { id: "21", data: { label: "📩 Send SMS with Details" }, position: { x: 1000, y: 900 }, style: nodeStyle },

  // General Symptom Queries Flow
  { id: "22", data: { label: "📝 Prompt for Symptoms" }, position: { x: 1400, y: 500 }, style: nodeStyle },
  { id: "23", data: { label: "🎤 Record Input" }, position: { x: 1400, y: 600 }, style: nodeStyle },
  { id: "24", data: { label: "📡 Send Query to Gemini API" }, position: { x: 1400, y: 700 }, style: nodeStyle },
  { id: "25", data: { label: "📜 Receive Guidance" }, position: { x: 1400, y: 800}, style: nodeStyle },
  { id: "26", data: { label: "📢 Speak Guidance" }, position: { x: 1400, y: 900 }, style: nodeStyle },


  { id: "32", data: { label: "❌ Invalid Option (Try Again)" }, position: { x: 1700, y: 400 }, style: nodeStyle },

  // SMS Support Flow
{ id: "27", data: { label: "📩 SMS Support" }, position: { x: 2000, y: 0 }, style: nodeStyle },
{ id: "28", data: { label: "📨 User Sends SMS Query" }, position: { x: 2000, y: 100 }, style: nodeStyle },
{ id: "29", data: { label: "🤖 Bot Processes Query" }, position: { x: 2000, y: 200 }, style: nodeStyle },
{ id: "30", data: { label: "📤 Send SMS Response" }, position: { x: 2000, y: 300 }, style: nodeStyle },
{ id: "31", data: { label: "🔚 End SMS Interaction" }, position: { x: 2000, y: 400 }, style: nodeStyle },

];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
  { id: "e4-6", source: "4", target: "6" },
  
  { id: "e6-7", source: "6", target: "7" },
  { id: "e6-8", source: "6", target: "8" },
  { id: "e6-9", source: "6", target: "9" },
  { id: "e6-10", source: "6", target: "10" },

  { id: "e7-11", source: "7", target: "11" },
  { id: "e11-12", source: "11", target: "12" },
  { id: "e12-13", source: "12", target: "13" },
  { id: "e13-14", source: "13", target: "14" },

  { id: "e8-15", source: "8", target: "15" },
  { id: "e15-16", source: "15", target: "16" },

  { id: "e9-17", source: "9", target: "17" },
  { id: "e17-18", source: "17", target: "18" },
  { id: "e18-19", source: "18", target: "19" },
  { id: "e19-20", source: "19", target: "20" },
  { id: "e20-21", source: "20", target: "21" },

  { id: "e10-22", source: "10", target: "22" },
  { id: "e22-23", source: "22", target: "23" },
  { id: "e23-24", source: "23", target: "24" },
  { id: "e24-25", source: "24", target: "25" },
  { id: "e25-26", source: "25", target: "26"},
  { id: "e16-13", source: "16", target: "13"},
  { id: "e21-14", source: "21", target: "14"},
  { id: "e26-21", source: "26", target: "21"},


  { id: "e27-28", source: "27", target: "28" },
{ id: "e28-29", source: "28", target: "29" },
{ id: "e29-30", source: "29", target: "30" },
{ id: "e30-31", source: "30", target: "31" },
{ id: "e6-32", source: "6", target: "32" },


];
const Flowchart = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
  
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
    );
  
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
    );
  
    return (
      <div className="flowchart-container" id="flowchart">
         <h2>Flowchart</h2>
         <p> The flowchart shows the process from user call to response, ensuring multilingual support and accurate assistance. </p>
      {/* Desktop: Show React Flow */}
      <div className="desktop-flowchart">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}  fitView  zoomOnScroll={false} 
  zoomOnPinch={false} 
  zoomOnDoubleClick={false}>
          {/* <MiniMap /> */}
          {/* <Controls /> */}
          <Background />
        </ReactFlow>
      </div>

      {/* Mobile: Show Image */}
      <div className="mobile-flowchart">
        <img src={flowchartpng} alt="Flowchart for Mobile" className="flowchart-image" />
      </div>
    </div>
      
    );
  };
  
  export default Flowchart;


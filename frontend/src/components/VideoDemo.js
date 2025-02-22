import React, { useState } from "react";
import "../styles/VideoDemo.css";
import { FaPlay } from "react-icons/fa"; // Play button icon

const VideoDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="video-demo" id="video">
      <h2>Watch Our Demo</h2>
      <p>See how Sahayak works in real-time.</p>

      {/* Video Thumbnail with Play Button */}
      <div className="video-thumbnail" onClick={() => setIsOpen(true)}>
        <img src="https://i.ytimg.com/vi/Ln7YVPevvaM/maxresdefault.jpg" alt="Video Thumbnail" />
        <div className="play-button">
          <FaPlay />
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="video-modal" onClick={() => setIsOpen(false)}>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="900"
              height="500"
              src="https://www.youtube.com/embed/Ln7YVPevvaM?si=8LgX7c-26_YxHIkD"
              title="Sahayak Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoDemo;

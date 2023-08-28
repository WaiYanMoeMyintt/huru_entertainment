import React from "react";
import "../css/poster.css";
const Poster = () => {
  return (
    <div className="poster_content">
      <div className="poster_control over-slide">
        <div className="poster_title">
          <div className="poster_text relative">
            <p className="relative">Online Streaming</p>
          </div>
          <h2 className="main_title">
            Step into a World of Cinematic Delights with Our Movie Entertainment
            Website
          </h2>
          <p>
            With our movie entertainment website, the silver screen comes to
            life like never before. Embark on a cinematic adventure that sparks
            emotions, kindles imaginations, and brings people together through
            the shared love of storytelling.
          </p>
          <div className="poster_button">
            <button>Browse Movies</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;

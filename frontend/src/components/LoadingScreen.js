import React from 'react';
import './LoadingScreenStyles.css';
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-container">
          <div className="globe-icon">
            <span className="uni">Uni</span>
          </div>
          <div className="orange-dot"></div>
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
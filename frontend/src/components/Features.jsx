// src/components/Features.js
import React from "react";
import "../App.css";

const featuresList = [
  { title: "Real-time Tracking", description: "Monitor your inventory levels in real-time with instant updates and automated alerts." },
  { title: "Advanced Analytics", description: "Gain insights into your operations with powerful analytics and reporting tools." },
  { title: "Multi-user Access", description: "Create multi-user accounts with easy sign up" },
];

function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2>Features</h2>
        <div className="features-grid">
          {featuresList.map((feat, i) => (
            <div key={i} className="feature-card">
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

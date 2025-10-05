// src/components/Hero.js
import React from "react";
import "../App.css";


function Hero() {
   const handleScroll = () => {
    window.scrollTo({ top: 800, behavior: "smooth" });
  };
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Your Product, Simplified</h1>
          <p>Build, track, and deliver with confidence. Everything in one place.</p>
          <button className="btn btn-primary" onClick={handleScroll}>Try for Free</button>
        </div>
        <div className="hero-image">
          {/* Replace with image */}
          <img src="/illuminated-light_1048944-11070769.jpg" alt="Hero screenshot" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

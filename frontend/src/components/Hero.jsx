import React from "react";
import "../App.css";

function Hero() {
  const handleScroll = () => {
    window.scrollTo({ top: 1370, behavior: "smooth" });
  };

  return (
    <section
      className="hero"
      style={{
        backgroundImage: "url('/illuminated-light_1048944-11070769.jpg')",
      }}
    >
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Your Product, Simplified</h1>
          <p>Build, track, and deliver with confidence. Everything in one place.</p>
          <button className="btn btn-primary btn-hero" onClick={handleScroll}>
            Try for Free
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

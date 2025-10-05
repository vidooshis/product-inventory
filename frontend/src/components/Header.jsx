// src/components/Header.js
import React from "react";
import "../App.css";
 // optional for component-specific styles

function Header() {
   const handleScroll = () => {
    window.scrollTo({ top: 800, behavior: "smooth" });
  };
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">Product Inventory</div>
        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="btn btn-primary"  onClick={handleScroll}>Get Started</button>
      </div>
    </header>
  );
}

export default Header;

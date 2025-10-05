// src/components/Footer.js
import React from "react";
import "../App.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div>
            <h4>Product Inventory</h4>
            <p>1234 Sample Street, Your City, Country</p>
            <p>Email: info@productinventory.com</p>
          </div>
          <div className="socials">
            {/* place social icons if you want */}
            <a href="#!"><FaTwitter /> Twitter</a>
            <a href="#!"><FaFacebook /> Facebook</a>
            <a href="#!"><FaInstagram /> Instagram</a>
          </div>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Product Inventory. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

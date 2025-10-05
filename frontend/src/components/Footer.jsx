// src/components/Footer.js
import React from "react";
import "../App.css";

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
            <a href="#!">Twitter</a>
            <a href="#!">Facebook</a>
            <a href="#!">Instagram</a>
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

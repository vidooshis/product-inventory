// src/components/Testimonials.js
import React from "react";
import "../App.css";


const testis = [
  { name: "Alice", text: "This was amazing. Loved it!" },
  { name: "Bob", text: "Helped us streamline everything." },
  { name: "Charlie", text: "Five stars, totally worth it." },
];

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h2>What Our Users Say</h2>
        <div className="testis-grid">
          {testis.map((t, i) => (
            <div key={i} className="testi-card">
              <p>"{t.text}"</p>
              <h4>- {t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

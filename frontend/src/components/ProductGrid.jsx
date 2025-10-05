// src/components/ProductGrid.js
import React from "react";
import "../App.css";
import ProductCard from "./SignupLogin";


const sampleProducts = [
  { title: "Product 1", description: "Awesome product 1", image: "https://via.placeholder.com/200" },
  { title: "Product 2", description: "Awesome product 2", image: "https://via.placeholder.com/200" },
  { title: "Product 3", description: "Awesome product 3", image: "https://via.placeholder.com/200" },
  { title: "Product 4", description: "Awesome product 4", image: "https://via.placeholder.com/200" },
];

function ProductGrid() {
  return (
    <section id="products" className="product-grid-section">
      <div className="container">
        <h2>Products</h2>
        <div className="grid">
          {sampleProducts.map((prod, idx) => (
            <ProductCard
              key={idx}
              title={prod.title}
              description={prod.description}
              image={prod.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;

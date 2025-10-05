import React from "react";
import "./Dashboard.css";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="product-card">
      <div className="card-header">
        <h3>{product.name}</h3>
        <button className="delete-btn" onClick={onDelete}>🗑</button>
      </div>
      <p>{product.description}</p>
      <span className="category">{product.category}</span>

      <div className="card-footer">
        <div className="price">₹{product.price}</div>
        {product.discountPercent > 0 && <span className="discount">{product.discountPercent}% off</span>}
      </div>

      <div className={`status ${product.inStock ? "in-stock" : "out-stock"}`}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </div>
    </div>
  );
};

export default ProductCard;

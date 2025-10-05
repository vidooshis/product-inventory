import React from "react";
import "./Dashboard.css";

const ProductCard = ({ product, onDelete, onEdit }) => {
  const { name, description, category, price, discountPercent, inStock } = product;

  // ✅ Calculate discounted price
  const discountedPrice =
    discountPercent && discountPercent > 0
      ? Math.round(price - (price * discountPercent) / 100)
      : price;

  return (
    <div className="product-card">
      <div className="card-header">
        <h3>{name}</h3>
        <div>
          <button className="edit-btn" onClick={onEdit}>✏️</button>
          <button className="delete-btn" onClick={onDelete}>🗑</button>
        </div>
      </div>

      <p>{description}</p>
      <span className="category">{category}</span>

      {/* ✅ Price section in a single line */}
      <div className="card-footer">
        <span className="discounted-price">₹{discountedPrice}</span>

        {discountPercent > 0 && (
          <>
            <span className="original-price">₹{price}</span>
            <span className="discount">({discountPercent}% off)</span>
          </>
        )}
      </div>

      <div className={`status ${inStock ? "in-stock" : "out-stock"}`}>
        {inStock ? "In Stock" : "Out of Stock"}
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useState } from "react";
import "./Dashboard.css";

const AddProductForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Electronics",
    price: "",
    discountPercent: "",
    inStock: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>

          <div className="price-row">
            <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required />
            <input type="number" name="discountPercent" placeholder="Discount (%)" value={formData.discountPercent} onChange={handleChange} />
          </div>

          <label className="checkbox">
            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
            In Stock
          </label>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;

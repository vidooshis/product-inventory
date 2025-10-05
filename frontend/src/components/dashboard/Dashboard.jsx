import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("User");

  const token = localStorage.getItem("token");

  // ✅ Extract username from JWT token
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsername(payload.username || "User");
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, [token]);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  // ✅ Add product
  const addProduct = async (newProduct) => {
    try {
      const res = await axios.post("/api/products", newProduct, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([...products, res.data]);
      setShowForm(false);
    } catch (err) {
      setError("Error adding product");
    }
  };

  // ✅ Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  // 🧭 UI States
  if (loading) {
    return (
      <div className="dashboard-container loading-state">
        <p>Loading inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container error-state">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h2>Hello, {username}</h2>
          <p>Welcome to your inventory dashboard</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Item
        </button>
      </header>

      {/* Product Grid */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onDelete={() => deleteProduct(p._id)}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No products yet.</p>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              + Add Your First Product
            </button>
          </div>
        )}

        {/* Add product card at the end */}
        {products.length > 0 && (
          <div className="add-card" onClick={() => setShowForm(true)}>
            <p>+ Add New Product</p>
          </div>
        )}
      </div>

      {/* Add Product Form */}
      {showForm && (
        <AddProductForm onAdd={addProduct} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Dashboard;

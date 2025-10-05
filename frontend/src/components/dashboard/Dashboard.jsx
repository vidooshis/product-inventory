import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("User");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ name: "", category: "", minPrice: "", maxPrice: "" });
  const itemsPerPage = 4; 
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProducts = products.filter(p => {
    return (
      (filters.name === "" || p.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.category === "" || p.category === filters.category) &&
      (filters.minPrice === "" || p.price >= filters.minPrice) &&
      (filters.maxPrice === "" || p.price <= filters.maxPrice)
    );
  });

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

  // ✅ Update product
  const updateProduct = async (updatedProduct) => {
    try {
      const res = await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.map(p => p._id === updatedProduct._id ? res.data : p));
      setEditingProduct(null);
    } catch (err) {
      setError("Error updating product");
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

  const handleEdit = (product) => {
    setEditingProduct(product);
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
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h2>Hello, {username}</h2>
          <p>Welcome to your inventory dashboard</p>
        </div>
        <div>
          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add Item
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="filters">
        <input type="text" name="name" placeholder="Filter by name" value={filters.name} onChange={handleFilterChange} />
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Other">Other</option>
        </select>
        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} />
        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onDelete={() => deleteProduct(p._id)}
              onEdit={() => handleEdit(p)}
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
      </div>

      {/* Add Product Form */}
      {showForm && (
        <AddProductForm onAdd={addProduct} onCancel={() => setShowForm(false)} />
      )}

      {/* Edit Product Form */}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onUpdate={updateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {totalPages > 1 && (
  <div className="pagination">
    <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            >
            Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
            <button
                key={i}
                className={currentPage === i + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(i + 1)}
            >
                {i + 1}
            </button>
            ))}

            <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            >
            Next
            </button>
        </div>
        )}
    </div>
  );
};

export default Dashboard;

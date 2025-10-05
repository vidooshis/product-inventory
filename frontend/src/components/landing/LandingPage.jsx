import React, { useState } from "react";
import Hero from "../Hero";
import SignupLogin from "../SignupLogin";
import Features from "../Features";
import Testimonials from "../Testimonials";
import axios from "axios";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

// Set base URL for Axios
axios.defaults.baseURL = "http://localhost:4000";

function LandingPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogin = async (username, password) => {
    try {
      setMessage("");
      const response = await axios.post("/api/auth/login", { 
        username, 
        password 
      });
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      setMessage("Login successful! Redirecting...");
      
      // Small delay to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      
    } catch (error) {
      console.error("Login failed", error);
      setMessage(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <SignupLogin onLogin={handleLogin} />
      <Testimonials />
    </div>
  );
}

export default LandingPage;
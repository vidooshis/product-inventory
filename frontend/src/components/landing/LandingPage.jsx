import React from "react";
import Hero from "../Hero";
import SignupLogin from "../SignupLogin";
import Features from "../Features";
import Testimonials from "../Testimonials";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("/api/auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="App">
      <Hero />
      {/* <ProductGrid /> */}
      <Features />
      <SignupLogin onLogin={handleLogin} />
      <Testimonials />
    </div>
  );
}

export default LandingPage;

// src/App.js
import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SignupLogin from "./components/SignupLogin";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      {/* <ProductGrid /> */}
      <Features />
      <SignupLogin />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;

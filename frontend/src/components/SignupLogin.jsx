import React, { useState } from "react";
import API from "../api/config"; // Import the configured API instance
import "../App.css";

function SignupLogin({ onLogin }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      setMessage("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await onLogin(loginUsername, loginPassword);
      // Clear form after successful login
      setLoginUsername("");
      setLoginPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupUsername || !signupPassword) {
      setMessage("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // ✅ FIXED: Use API instance instead of direct axios
      const response = await API.post("/api/auth/signup", {
        username: signupUsername,
        password: signupPassword
      });
      
      setMessage("User signed up successfully! You can now login with your credentials.");
      
      // Clear signup form
      setSignupUsername("");
      setSignupPassword("");
      
    } catch (error) {
      console.error("Signup error:", error);
      setMessage(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="signup-login-section">
      <div className="container">
        <h2 className="section-title">Get Started Today</h2>
        <p className="section-subtitle">Choose your preferred way to access the system</p>

        {message && (
          <div className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <div className="card-container">
          {/* Signup Card */}
          <div className="card signup-card">
            <h3>Join Us Today</h3>
            <p>Create your new account</p>
            <form onSubmit={handleSignup}>
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Enter your username" 
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                required
                disabled={isLoading}
              />
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Create a password" 
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="btn btn-success btn-login"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          {/* Login Card */}
          <div className="card login-card">
            <h3>Welcome Back</h3>
            <p>Sign in to your existing account</p>
            <form onSubmit={handleLogin}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                disabled={isLoading}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="btn btn-primary btn-login"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupLogin;
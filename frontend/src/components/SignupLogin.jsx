import React from "react";
import "../App.css";

function SignupLogin() {
  return (
    <section className="signup-login-section">
      <div className="container">
        <h2 className="section-title">Get Started Today</h2>
        <p className="section-subtitle">Choose your preferred way to access the system</p>

        <div className="card-container">
          {/* Login Card */}
          <div className="card login-card">
            <h3>Welcome Back</h3>
            <p>Sign in to your existing account</p>
            <form>
              <label>Username</label>
              <input type="text" placeholder="Enter your username" />
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
              <button type="submit" className="btn btn-primary btn-login">Sign In</button>
            </form>
          </div>

          {/* Signup Card */}
          <div className="card signup-card">
            <h3>Join Us Today</h3>
            <p>Create your new account</p>
            <form>
              <label>Username</label>
              <input type="text" placeholder="Enter your username" />
              <label>Password</label>
              <input type="password" placeholder="Create a password" />
              <button type="submit" className="btn btn-success btn-login">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupLogin;


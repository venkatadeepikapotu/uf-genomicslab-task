import React, { useState } from "react";
import "./../styles/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/reset-password/", {  // ✅ Ensure this URL exists in Django
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
        setEmail("");
      } else {
        setError(data.error || "Failed to send reset link.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="reset-container">
      <h2>Request New Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email Address *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ResetPassword;  // ✅ Ensure `export default ResetPassword`

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    first_name: "",
    last_name: "",
    affiliation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handling input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          confirmEmail: formData.confirmEmail,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          affiliation: formData.affiliation,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        if (data.username) {
          setError(data.username[0]); 
        } else if (data.email) {
          setError(data.email[0]); 
        } else {
          setError(data.message || "Registration failed.");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };
  
  

  return (
    <div className="register-container">
      <h2>Create New Account</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username *</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Email Address *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Confirm Email Address *</label>
        <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />

        <label>Password *</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>First Name *</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />

        <label>Last Name *</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />

        <label>Affiliation *</label>
        <input type="text" name="affiliation" value={formData.affiliation} onChange={handleChange} required />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterForm;

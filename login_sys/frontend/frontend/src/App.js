import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import RegisterForm from "./components/RegisterForm";
import ResetPassword from "./components/ResetPassword";
import "./styles/App.css";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <Navbar setMenuOpen={setMenuOpen} />
      <div className={`content ${menuOpen ? "menu-active" : ""}`}>
        <h2>User Account</h2>
        <div className="nav-tabs">
          <NavLink to="/register" className="tab-link">Create new account</NavLink>
          <NavLink to="/login" className="tab-link">Log in</NavLink>
          <NavLink to="/reset" className="tab-link">Request new password</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

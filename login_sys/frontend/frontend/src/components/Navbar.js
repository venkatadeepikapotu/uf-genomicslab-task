import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./../styles/Navbar.css";
import GDRLogo from "../assets/images/GDR_logo.png";

const Dropdown = ({ title, items, isSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`dropdown ${isSidebar ? "sidebar-dropdown" : ""}`}>
      <button className="dropbtn" onClick={() => setOpen(!open)}>
        {title} ▼
      </button>
      <div className={`dropdown-content ${open ? "show" : ""}`}>
        {items.map((item, index) => (
          <a key={index} href="#">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={GDRLogo} alt="Home" />
          </div>

          {isMobile && (
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
          )}

          {!isMobile && (
            <div className="menu">
              <Dropdown title="Species" items={["Fragaria (all species)", "Fragaria vesca", "Fragaria x ananassa"]} />
              <Dropdown title="Data" items={["Data Overview", "Data Submission", "Download Data"]} />
              <Dropdown title="Search" items={["Search Genes", "Search Markers", "Search Germplasm"]} />
              <Dropdown title="Tools" items={["BLAST+", "JBrowse", "Primer3"]} />
              <Dropdown title="General" items={["About", "Cite GDR", "Newsletters"]} />
              <Dropdown title="Help" items={["Contact", "User Manual", "Video Tutorials"]} />
              <Dropdown title="Community" items={["Conferences", "Employment", "Projects"]} />
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
        </div>
      </nav>

      {isMobile && (
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>

          <div className="nav-links">
            <Dropdown title="Species" items={["Fragaria (all species)", "Fragaria vesca", "Fragaria x ananassa"]} isSidebar />
            <Dropdown title="Data" items={["Data Overview", "Data Submission", "Download Data"]} isSidebar />
            <Dropdown title="Search" items={["Search Genes", "Search Markers", "Search Germplasm"]} isSidebar />
            <Dropdown title="Tools" items={["BLAST+", "JBrowse", "Primer3"]} isSidebar />
            <Dropdown title="General" items={["About", "Cite GDR", "Newsletters"]} isSidebar />
            <Dropdown title="Help" items={["Contact", "User Manual", "Video Tutorials"]} isSidebar />
            <Dropdown title="Community" items={["Conferences", "Employment", "Projects"]} isSidebar />
            <NavLink to="/login" onClick={() => setSidebarOpen(false)}>Login</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
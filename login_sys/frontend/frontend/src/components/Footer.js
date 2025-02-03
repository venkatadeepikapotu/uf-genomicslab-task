import React from "react";
import "./../styles/Footer.css";

const Footer = () => (
  <footer className="footer">
    <p>Developed by Mainlab Bioinformatics at Washington State University</p>
    <p>Funded by a partnership of USDA, NSF, Industry, and US Land Grant Universities</p>
    <p>&copy; 2010-2024.{" "}
      <span className="footer-links">
        <a href="#">Contact Us</a> |{" "}
        <a href="#">Report a Problem</a> |{" "}
        <a href="#">Make a Suggestion</a> |{" "}
        <a href="#">Follow Us</a>
      </span>
    </p>
  </footer>
);

export default Footer;

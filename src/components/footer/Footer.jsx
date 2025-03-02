import React, { useState } from "react";
import "./Footer.scss";
import { useLocation } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from 'react-redux';
import { selectAboutUsContent, selectContactInfo } from '../../redux/slice/adminSlice'; // Adjust the path if necessary

const Footer = () => {
  const location = useLocation();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const aboutUsContent = useSelector(selectAboutUsContent);
  const contactInfo = useSelector(selectContactInfo); // Fetching the contact info from Redux

  const handleChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted. We'll get back to you soon!");
    setContactForm({ name: "", email: "", message: "" });
  };

  function pathMatchRoute(route) {
    return route === location.pathname;
  }

  return (
    <div
      className={`footer-container ${
        pathMatchRoute("/login") ||
        pathMatchRoute("/register") ||
        pathMatchRoute("/reset") ||
        pathMatchRoute("/cart") ||
        pathMatchRoute("/checkout-success") ||
        pathMatchRoute("/order-history")
          ? "margin"
          : "no-margin"
      }`}
    >
      <div className="footer">
        <div className="footer__info">
          <div className="footer__section">
            <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>About Us</h4>
            <p style={{ fontSize: "16px", lineHeight: "24px" }}>
              {aboutUsContent || "We are dedicated to providing quality products with a seamless shopping experience."}
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="footer__section">
            <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>Contact Us</h4>
            <p style={{ fontSize: "16px", lineHeight: "24px" }}>
              <FaEnvelope style={{ marginRight: "10px" }} />
              Email: {contactInfo.email}
            </p>
            <p style={{ fontSize: "16px", lineHeight: "24px" }}>
              <FaPhone style={{ marginRight: "10px" }} />
              Phone: {contactInfo.phone}
            </p>
            <p style={{ fontSize: "16px", lineHeight: "24px" }}>
              <FaMapMarkerAlt style={{ marginRight: "10px" }} />
              Location: {contactInfo.location}
            </p>
          </div>
        </div>

        {/* Add Gallery Button */}
        <div className="footer__section">
          <Link to="/gallery" className="footer__link">
            <Button variant="contained" color="primary" disableElevation>
              View Gallery
            </Button>
          </Link>
        </div>

        {/* Add Contact Us Box */}
        <div className="footer__section footer__section--contact">
          <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>Build Your Website with Us</h4>
          <h4>If you need a website similar to like this<br/> feel free to reach out!<br/>
            Email: ravi@yourwebsite.com<br/>
            Phone: +91-6200443869
          </h4>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Name"
              name="name"
              value={contactForm.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Your Email"
              name="email"
              type="email"
              value={contactForm.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Your Message"
              name="message"
              value={contactForm.message}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Submit
            </Button>
          </form>
        </div>

        <div className="footer__bottom">
          <p className="footer__light-color" style={{ fontSize: "14px", lineHeight: "20px" }}>
            © 2024 Balaji. All rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

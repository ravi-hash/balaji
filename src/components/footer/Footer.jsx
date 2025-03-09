import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config"; // Ensure correct import
import "./Footer.scss";
import { useLocation } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Footer = () => {
  const location = useLocation();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [aboutUsContent, setAboutUsContent] = useState("");
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "", location: "" });

  // Fetch footer content directly from Firestore
  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const footerRef = doc(db, "settings", "footer");
        const footerSnap = await getDoc(footerRef);
        if (footerSnap.exists()) {
          const data = footerSnap.data();
          setAboutUsContent(data.aboutUsContent || "We are dedicated to providing quality products with a seamless shopping experience.");
          setContactInfo({
            email: data.email || "theprint007@gmail.com",
            phone: data.phone || "+91- 9102490062, 9304060062",
            location: data.location || "G - 3. S.B.I Building, Garikhana, Khagaul, Patna - 801105",
          });
        }
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };

    fetchFooterContent();
  }, []);

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
              {aboutUsContent}
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
          <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>
            Build Your Website with Us
          </h4>
          <h4>
            If you need a website similar to this
            <br /> feel free to reach out!
            <br />
            Email: ravii.krr62@gmail.com
            <br />
            Phone: +91-6202880695
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

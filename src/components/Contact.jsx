import "../styles/Contact.css";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa6";


function Contact() {
  return (
    <section className="contact">

      <h2>Contact Us</h2>

      <div className="contact-container">

        <div className="contact-info">

          <h3>Luxe Unisex Salon</h3>

          <p><FaLocationDot className="icon" /> 123 Park Street, Kolkata</p>

<p><FaPhone className="icon" /> +91 98765 43210</p>

<p><FaEnvelope className="icon" /> info@luxesalon.com</p>

<p><FaClock className="icon" /> Mon - Sat : 9 AM - 9 PM</p>
        </div>

        <div className="quick-links">

          <h3>Quick Links</h3>

          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Gallery</a>
          <a href="#">Book Appointment</a>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Luxe Unisex Salon. All Rights Reserved.
      </p>

    </section>
  );
}

export default Contact;
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>LUXE UNISEX SALON</h2>
          <p>
            Premium Beauty & Grooming Experience
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Gallery</a>
          <a href="#">Book Appointment</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📞 +91 98765 43210</p>
          <p>✉ info@luxesalon.com</p>
          <p>Kolkata, West Bengal</p>
        </div>

        <div className="footer-section">
          <h3>Opening Hours</h3>

          <p>Mon - Sat</p>
          <p>9:00 AM - 9:00 PM</p>

          <p>Sunday</p>
          <p>10:00 AM - 6:00 PM</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Luxe Unisex Salon. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;
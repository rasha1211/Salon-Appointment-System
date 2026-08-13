import "../styles/Contact.css";

import {
    FaLocationDot,
    FaPhone,
    FaEnvelope,
    FaClock,
} from "react-icons/fa6";

function Contact() {
    return (
        <section className="contact" id="contact">

            <div className="contact-heading">
                <p className="contact-label">GET IN TOUCH</p>

                <h2>Let's Make You Feel <span>Beautiful.</span></h2>

                <p className="contact-subtitle">
                    Visit Luxe Unisex Salon and experience beauty,
                    style and confidence in a space designed for you.
                </p>
            </div>


            <div className="contact-container">

                {/* Contact Information */}

                <div className="contact-info">

                    <h3>Luxe Unisex Salon</h3>

                    <p>
                        <FaLocationDot className="icon" />
                        123 Park Street, Kolkata
                    </p>

                    <p>
                        <FaPhone className="icon" />
                        +91 98765 43210
                    </p>

                    <p>
                        <FaEnvelope className="icon" />
                        info@luxesalon.com
                    </p>

                    <p>
                        <FaClock className="icon" />
                        Mon - Sun : 9 AM - 9 PM
                    </p>

                </div>


                {/* Quick Links */}

                <div className="quick-links">

                    <h3>Explore</h3>

                    <a href="/">Home</a>
                    <a href="#services">Services</a>
                    <a href="#about">About</a>
                    <a href="#gallery">Gallery</a>
                    <a href="/booking">Book Appointment</a>

                </div>


                {/* Closing CTA */}

                <div className="contact-cta">

                    <p className="cta-label">
                        YOUR NEXT LOOK AWAITS
                    </p>

                    <h3>Ready for a little<br />Luxe?</h3>

                    <a href="/booking" className="contact-button">
                        Book Appointment
                    </a>

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
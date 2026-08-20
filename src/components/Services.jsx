import { useEffect, useRef, useState } from "react";
import "../styles/Services.css";

import haircutImage from "../assets/service-haircut.jpg";
import hairspaImage from "../assets/service-hairspa.jpg";
import haircolourImage from "../assets/service-haircolour.jpg";
import facialImage from "../assets/service-facial.jpg";
import manicureImage from "../assets/service-manicure.jpg";
import pedicureImage from "../assets/service-pedicure.jpg";
import beardImage from "../assets/service-beard.jpg";

function Services() {
    const servicesSectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // ==========================================
    // FIXED PREMIUM SERVICES
    // These are NOT loaded from the database.
    // ==========================================

    const premiumServices = [
        {
            id: "premium-haircut",
            name: "Haircut",
            duration: 45,
            price: 500,
            image: haircutImage,
            description:
                "Professional styling for men and women.",
        },

        {
            id: "premium-hairspa",
            name: "Hair Spa",
            duration: 60,
            price: 1200,
            image: hairspaImage,
            description:
                "Healthy and nourishing treatment for smooth, beautiful hair.",
        },

        {
            id: "premium-haircolour",
            name: "Hair Colour",
            duration: 90,
            price: 1800,
            image: haircolourImage,
            description:
                "Premium hair colouring performed by experienced professionals.",
        },

        {
            id: "premium-facial",
            name: "Facial",
            duration: 60,
            price: 1000,
            image: facialImage,
            description:
                "Glow-enhancing facial treatment for fresh and radiant skin.",
        },

        {
            id: "premium-manicure",
            name: "Manicure",
            duration: 45,
            price: 600,
            image: manicureImage,
            description:
                "Professional nail care for beautiful and well-groomed hands.",
        },

        {
            id: "premium-pedicure",
            name: "Pedicure",
            duration: 50,
            price: 700,
            image: pedicureImage,
            description:
                "Relaxing foot and nail care for a clean and polished look.",
        },

        {
            id: "premium-beard",
            name: "Beard Grooming",
            duration: 30,
            price: 400,
            image: beardImage,
            description:
                "Modern beard trimming, shaping and grooming for a refined look.",
        },
    ];

    // ==========================================
    // RESTART ANIMATION EVERY TIME
    // SERVICES ENTER VIEWPORT
    // ==========================================

    useEffect(() => {
        const section = servicesSectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(false);

                    requestAnimationFrame(() => {
                        setIsVisible(true);
                    });
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={servicesSectionRef}
            className={`services ${
                isVisible ? "services-visible" : ""
            }`}
            id="services"
        >

            {/* ==========================================
                HEADING
            ========================================== */}

            <div className="services-heading">
                <span>WHAT WE OFFER</span>

                <h2>Our Premium Services</h2>

                <p>
                    Expert beauty and grooming services crafted
                    to make you look and feel your best.
                </p>
            </div>


            {/* ==========================================
                SERVICE CARDS
            ========================================== */}

            <div className="service-container">

                {premiumServices.map((service, index) => (

                    <div
                        className="service-card"
                        key={service.id}
                        style={{
                            "--card-delay": `${index * 0.15}s`,
                        }}
                    >

                        <div className="service-image">

                            <img
                                src={service.image}
                                alt={service.name}
                            />

                            <div className="service-image-overlay"></div>

                        </div>


                        <div className="service-card-content">

                            <span className="service-number">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <h3>
                                {service.name}
                            </h3>

                            <p className="service-description">
                                {service.description}
                            </p>


                            <div className="service-info">

                                <span>
                                    {service.duration} minutes
                                </span>

                                <span>
                                    ₹{service.price}
                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Services;
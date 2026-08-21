import { useEffect, useRef, useState } from "react";
import "../styles/Services.css";

const API_URL =
    "https://salon-appointment-system-production.up.railway.app/api/services";

function Services() {
    const servicesSectionRef = useRef(null);

    const [services, setServices] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // LOAD SERVICES FROM DATABASE
    // ==========================================

    useEffect(() => {
        const loadServices = async () => {
            try {
                const response = await fetch(API_URL);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load services"
                    );
                }

                setServices(data);

            } catch (error) {
                console.error(
                    "PREMIUM SERVICES LOAD ERROR:",
                    error
                );

            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);


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

                <span>
                    WHAT WE OFFER
                </span>

                <h2>
                    Our Premium Services
                </h2>

                <p>
                    Expert beauty and grooming services crafted
                    to make you look and feel your best.
                </p>

            </div>


            {/* ==========================================
                SERVICE CARDS
            ========================================== */}

            <div className="service-container">

                {loading ? (

                    <p>
                        Loading services...
                    </p>

                ) : services.length === 0 ? (

                    <p>
                        No services available.
                    </p>

                ) : (

                    services.map((service, index) => (

                        <div
                            className="service-card"
                            key={service.id}
                            style={{
                                "--card-delay":
                                    `${index * 0.15}s`,
                            }}
                        >

                            {/* ==========================================
                                SERVICE IMAGE
                            ========================================== */}

                            <div className="service-image">

                                {service.image_url ? (

                                    <img
                                        src={service.image_url}
                                        alt={service.name}
                                    />

                                ) : (

                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#1a1a1a",
                                            color: "#999",
                                        }}
                                    >
                                        No Image
                                    </div>

                                )}

                                <div className="service-image-overlay"></div>

                            </div>


                            {/* ==========================================
                                SERVICE CONTENT
                            ========================================== */}

                            <div className="service-card-content">

                                <span className="service-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>


                                <h3>
                                    {service.name}
                                </h3>


                                {service.description && (

                                    <p className="service-description">
                                        {service.description}
                                    </p>

                                )}


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

                    ))

                )}

            </div>

        </section>
    );
}

export default Services;
import { useEffect, useState } from "react";
import "../styles/Hero.css";
import useScrollReveal from "../hooks/useScrollReveal";

import hero1 from "../assets/hero.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import hero5 from "../assets/hero5.jpg";

function Hero() {
    const heroRef = useScrollReveal();

    const slides = [
        {
            image: hero1,
            label: "LUXE UNISEX SALON",
            title: "Beauty,",
            highlight: "Refined.",
            description:
                "A premium salon experience crafted around your style, confidence and individuality."
        },
        {
            image: hero2,
            label: "PROFESSIONAL STYLING",
            title: "Your Style,",
            highlight: "Perfected.",
            description:
                "Expert styling and personalized beauty services designed just for you."
        },
        {
            image: hero3,
            label: "BEAUTY & CARE",
            title: "Feel Beautiful,",
            highlight: "Confident.",
            description:
                "Relax, refresh and discover a beauty experience created with care."
        },
        {
            image: hero4,
            label: "PREMIUM EXPERIENCE",
            title: "Where Beauty Meets",
            highlight: "Luxury.",
            description:
                "Experience refined services, professional care and exceptional attention to detail."
        },
        {
            image: hero5,
            label: "MODERN BEAUTY",
            title: "Designed For",
            highlight: "You.",
            description:
                "Modern beauty treatments tailored to your personality and lifestyle."
        },
        
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const current = slides[currentSlide];

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section
            ref={heroRef}
            className="hero scroll-reveal"
        >

            {/* HERO IMAGES */}
            <div className="hero-slides">

                {slides.map((slide, index) => (
                    <div
                        key={slide.image}
                        className={`hero-slide ${
                            index === currentSlide ? "active" : ""
                        }`}
                        style={{
                            backgroundImage: `url(${slide.image})`
                        }}
                    />
                ))}

            </div>

            {/* DARK OVERLAY */}
            <div className="hero-overlay"></div>

            {/* CONTENT */}
            <div className="hero-content">

                <p className="hero-label">
                    {current.label}
                </p>

                <h1>
                    {current.title}{" "}
                    <span>{current.highlight}</span>
                </h1>

                <p className="hero-description">
                    {current.description}
                </p>

                <div className="hero-buttons">

                    <button
                        className="hero-primary"
                        onClick={() => {
                            document
                                .getElementById("booking")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                });
                        }}
                    >
                        Book Appointment
                    </button>

                </div>

            </div>

            {/* CAROUSEL CONTROLS */}
            <div className="hero-carousel-controls">

                <button
                    type="button"
                    className="hero-arrow"
                    onClick={() =>
                        setCurrentSlide(
                            (currentSlide - 1 + slides.length) %
                                slides.length
                        )
                    }
                    aria-label="Previous slide"
                >
                    &#10094;
                </button>

                <div className="hero-dots">

                    {slides.map((_, index) => (
                        <button
                            type="button"
                            key={index}
                            className={`hero-dot ${
                                index === currentSlide
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}

                </div>

                <button
                    type="button"
                    className="hero-arrow"
                    onClick={() =>
                        setCurrentSlide(
                            (currentSlide + 1) %
                                slides.length
                        )
                    }
                    aria-label="Next slide"
                >
                    &#10095;
                </button>

            </div>

            {/* SCROLL INDICATOR */}
            <div className="hero-scroll">
                <span></span>
                <p>Scroll to explore</p>
            </div>

        </section>
    );
}

export default Hero;
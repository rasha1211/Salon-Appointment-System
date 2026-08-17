import "../styles/Hero.css";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-content">

                <p className="hero-label">
                    LUXE UNISEX SALON
                </p>

                <h1>
                    Beauty, <span>Refined.</span>
                </h1>

                <p className="hero-description">
                    A modern salon experience crafted around
                    your style, confidence and individuality.
                </p>

                <div className="hero-buttons">

                    <button
    className="hero-primary"
    onClick={() => {
        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });
    }}
>
    Book Appointment
</button>
                    

                </div>

            </div>

            <div className="hero-scroll">
                <span></span>
                <p>Scroll to explore</p>
            </div>

        </section>
    );
}

export default Hero;
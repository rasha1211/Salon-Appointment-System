import "../styles/About.css";
import aboutImage from "../assets/about.jpg";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-image">
        <img src={aboutImage} alt="About Salon" />
      </div>

      <div className="about-content">

        <h2>About Luxe Salon</h2>

        <p>
          At Luxe Unisex Salon, we believe beauty is an experience.
          Our expert stylists provide premium hair, skincare,
          grooming and spa services in a luxurious environment.
        </p>

        <p>
          Using world-class products and modern techniques,
          we ensure every customer leaves looking and feeling
          their absolute best.
        </p>

        <button>Know More</button>

      </div>

    </section>
  );
}

export default About;
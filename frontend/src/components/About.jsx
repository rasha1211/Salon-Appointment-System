import "../styles/About.css";
import aboutImage from "../assets/about.jpg";
import useScrollReveal from "../hooks/useScrollReveal";

function About() {
  const aboutRef = useScrollReveal();

  return (
<section
  ref={aboutRef}
  className="about"
  id="about"
>
        <div className="about-image about-reveal-image">
        <img src={aboutImage} alt="About Salon" />
      </div>

<div className="about-content about-reveal-content">
<h2 className="about-line about-heading">
  About Luxe Salon
</h2>
        <p className="about-line about-paragraph">
  At Luxe Unisex Salon, we believe beauty is an experience.
  Our expert stylists provide premium hair, skincare,
  grooming and spa services in a luxurious environment.
</p>

       <p className="about-line about-paragraph">
  Using world-class products and modern techniques,
  we ensure every customer leaves looking and feeling
  their absolute best. For us, it's not just about services,
  it's about creating a personalized journey of self-expression
  and confidence.
</p>

        <button
  className="about-line about-button"
  onClick={() => {
    document.getElementById("services").scrollIntoView({
      behavior: "smooth"
    });
  }}
>
  Explore Our Services
</button>


      </div>

    </section>
  );
}

export default About;
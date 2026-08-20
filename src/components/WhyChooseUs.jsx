import {
  FaUserTie,
  FaGem,
  FaSpa,
  FaCalendarCheck,
  FaHeadset,
} from "react-icons/fa";

import "../styles/WhyChooseUs.css";
import useScrollReveal from "../hooks/useScrollReveal";

function WhyChooseUs() {
  const whyRef = useScrollReveal();

  const features = [
    {
      icon: <FaUserTie />,
      title: "Expert Stylists",
      description:
        "Experienced professionals delivering trendy and personalized hairstyles.",
    },
    {
      icon: <FaGem />,
      title: "Premium Products",
      description:
        "We use trusted international brands for premium hair and skincare.",
    },
    {
      icon: <FaSpa />,
      title: "Luxury Experience",
      description:
        "Relax in a refined ambience designed around comfort and elegance.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Easy Booking",
      description:
        "Book your appointment online anytime with just a few simple clicks.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description:
        "Our team is always available to assist you with your salon experience.",
    },
  ];

  return (
    <section
      ref={whyRef}
      className="why"
      id="why"
    >
      <div className="why-heading">
        <span className="why-label">THE LUXE EXPERIENCE</span>

        <h2>Why Choose Luxe Salon?</h2>

        <p>
          More than a salon — an experience designed around you.
        </p>
      </div>

      <div className="why-container">
        {features.map((feature, index) => (
          <div
            className="why-card"
            key={feature.title}
            style={{
              "--delay": `${index * 0.12}s`,
            }}
          >
            <div className="why-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

            <span className="why-card-line"></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
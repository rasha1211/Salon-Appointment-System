import {
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";

import "../styles/Testimonials.css";
import useScrollReveal from "../hooks/useScrollReveal";

function Testimonials() {
  const testimonialsRef = useScrollReveal();

  const testimonials = [
    {
      text:
        "Absolutely loved the service! The staff was professional and my haircut turned out exactly as I wanted.",
      name: "Priya Sharma",
    },
    {
      text:
        "The ambience is luxurious and relaxing. I highly recommend Luxe Salon for hair spa and skin treatments.",
      name: "Aditya Yadav",
    },
    {
      text:
        "Booking was easy and the stylists were amazing. Definitely coming back!",
      name: "Ananya Gupta",
    },
    {
      text:
        "The bridal makeup service was exceptional. I felt like a real princess on my wedding day. Thank you, Luxe Salon!",
      name: "Ritika Sharma",
    },
    {
      text:
        "I had a wonderful experience at Luxe Salon. The staff was friendly and the service was top-notch.",
      name: "Riya Patel",
    },
    {
      text:
        "The hair coloring service was really good. Highly recommend Luxe Salon for anyone looking for a professional and stylish look.",
      name: "Virat Kohli",
    },
  ];

  return (
    <section
      ref={testimonialsRef}
      className="testimonials"
      id="testimonials"
    >

      <div className="testimonials-heading">

        <span className="testimonials-label">
          CLIENT EXPERIENCES
        </span>

        <h2>What Our Clients Say</h2>

        <p>
          Real experiences from clients who chose Luxe Salon.
        </p>

      </div>


      <div className="testimonial-container">

        {testimonials.map((testimonial, index) => (

          <div
            className="testimonial-card"
            key={testimonial.name}
            style={{
              "--delay": `${index * 0.12}s`,
            }}
          >

            <div className="quote-icon">
              <FaQuoteLeft />
            </div>


            <p className="testimonial-text">
              "{testimonial.text}"
            </p>


            <div className="testimonial-stars">

              {[...Array(5)].map((_, starIndex) => (
                <FaStar key={starIndex} />
              ))}

            </div>


            <span className="testimonial-name">
              — {testimonial.name}
            </span>


            <div className="testimonial-line"></div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;
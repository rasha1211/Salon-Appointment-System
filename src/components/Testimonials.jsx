import "../styles/Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">

      <h2>What Our Clients Say</h2>

      <div className="testimonial-container">

        <div className="testimonial-card">
          <p>
            "Absolutely loved the service! The staff was professional and my
            haircut turned out exactly as I wanted."
          </p>

          <h4>★★★★★</h4>
          <span>- Priya Sharma</span>
        </div>

        <div className="testimonial-card">
          <p>
            "The ambience is luxurious and relaxing. I highly recommend Luxe
            Salon for hair spa and skin treatments."
          </p>

          <h4>★★★★★</h4>
          <span>- Aditya Yadav</span>
        </div>

        <div className="testimonial-card">
          <p>
            "Booking was easy and the stylists were amazing. Definitely coming
            back!"
          </p>

          <h4>★★★★★</h4>
          <span>- Ananya Gupta</span>
        </div>

        <div className="testimonial-card">
          <p>
            "The bridal makeup service was exceptional. I felt like a real princess on my wedding day. Thank you, Luxe Salon!"
          </p>

          <h4>★★★★★</h4>
          <span>- Ritika Sharma</span>
        </div>

      </div>

    </section>
  );
}

export default Testimonials;
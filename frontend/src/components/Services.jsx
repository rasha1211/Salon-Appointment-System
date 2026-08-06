import "../styles/Services.css";

function Services() {
  return (
    <section className="services">

      <h2>Our Premium Services</h2>

      <div className="service-container">

        <div className="card">
          <h3>Hair Cut</h3>
          <p>Professional styling for men and women.</p>
        </div>

        <div className="card">
          <h3>Hair Spa</h3>
          <p>Healthy and nourishing treatment.</p>
        </div>

        <div className="card">
          <h3>Hair Color</h3>
          <p>Premium coloring by experts.</p>
        </div>

        <div className="card">
          <h3>Facial</h3>
          <p>Glow enhancing facial treatment.</p>
        </div>

        <div className="card">
          <h3>Bridal Makeup</h3>
          <p>Elegant makeup for every occasion.</p>
        </div>

        <div className="card">
          <h3>Beard Styling</h3>
          <p>Modern beard grooming and styling.</p>
        </div>

      </div>

    </section>
  );
}

export default Services;
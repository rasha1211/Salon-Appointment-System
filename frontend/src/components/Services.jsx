import { useEffect, useState } from "react";
import "../styles/Services.css";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("SERVICES LOAD ERROR:", error);
      });
  }, []);

  return (
    <section className="services" id="services">
      <h2>Our Premium Services</h2>

      <div className="service-container">

        {services
          .filter((service) => service.is_active === 1)
          .map((service) => (
            <div className="card" key={service.id}>

            <h3>{service.name}</h3>

<p className="service-description">
  {service.name === "Hair Cut" &&
    "Professional styling for men and women."}

  {service.name === "Hair Spa" &&
    "Healthy and nourishing treatment for smooth, beautiful hair."}

  {service.name === "Hair Coloring" &&
    "Premium hair coloring performed by experienced professionals."}

  {service.name === "Facial" &&
    "Glow-enhancing facial treatment for fresh and radiant skin."}

  {service.name === "Manicure" &&
    "Professional nail care for beautiful and well-groomed hands."}

  {service.name === "Pedicure" &&
    "Relaxing foot and nail care for a clean and polished look."}

  {service.name === "Beard Grooming" &&
    "Modern beard trimming, shaping and grooming for a refined look."}

  {service.name === "Full body Wax" &&
    "Smooth and gentle waxing treatment for silky skin."}

  {service.name === "Keratin Treatment" &&
    "Professional keratin treatment for smoother, shinier and manageable hair."}
</p>

<p>
  {service.duration} minutes · ₹{service.price}
</p>
            </div>
          ))}

      </div>
    </section>
  );
}

export default Services;
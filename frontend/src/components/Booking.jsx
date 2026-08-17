import { useState } from "react";
import "../styles/Booking.css";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    service: [],
    date: "",
    time: "",
    specialRequest: "",
  });

  const [message, setMessage] = useState("");
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceDropdown = async () => {
    const newState = !showServices;

    setShowServices(newState);

    if (newState && services.length === 0) {
      try {
        const response = await fetch(
          "https://salon-appointment-system-production.up.railway.app/api/services"
        );

        const data = await response.json();

        if (response.ok) {
          setServices(data);
        }
      } catch (error) {
        console.error("SERVICES LOAD ERROR:", error);
      }
    }
  };

  const handleServiceChange = (service) => {
    setFormData((prev) => {
      if (prev.service.includes(service)) {
        return {
          ...prev,
          service: prev.service.filter(
            (item) => item !== service
          ),
        };
      }

      return {
        ...prev,
        service: [...prev.service, service],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure at least one service is selected
    if (formData.service.length === 0) {
      setMessage("Please select at least one service.");
      return;
    }

    setMessage("Booking your appointment...");

    try {
      const response = await fetch(
    "https://salon-appointment-system-production.up.railway.app/api/appointments",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            service: formData.service.join(", "),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Appointment booked successfully! ❤️");

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          service: [],
          date: "",
          time: "",
          specialRequest: "",
        });

        // Close service dropdown
        setShowServices(false);
      } else {
        setMessage(
          data.message || "Something went wrong."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server.");
    }
  };

  return (
    <section className="booking-section" id="booking">

      <h1>Book Your Appointment</h1>

      <p>
        Schedule your salon visit in just a few simple steps.
      </p>

      <form
        className="booking-form"
        onSubmit={handleSubmit}
      >

        {/* Name */}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email */}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Phone */}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Gender */}

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Services */}

        <div className="service-dropdown">

          <button
            type="button"
            className="service-dropdown-button"
            onClick={handleServiceDropdown}
          >
            <span>
              {formData.service.length > 0
                ? formData.service.join(", ")
                : "Select Service"}
            </span>

            <span
              className={`service-arrow ${
                showServices ? "open" : ""
              }`}
            ></span>
          </button>

          {showServices && (
            <div className="service-options">

              {services.map((service) => (

                <label
                  key={service.id}
                  className="service-option"
                >

                  <input
                    type="checkbox"
                    checked={formData.service.includes(
                      service.name
                    )}
                    onChange={() =>
                      handleServiceChange(
                        service.name
                      )
                    }
                  />

                  <span>
                    {service.name}
                  </span>

                </label>

              ))}

            </div>
          )}

        </div>

        {/* Date */}

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Time */}

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        {/* Special Request */}

        <textarea
          name="specialRequest"
          rows="5"
          placeholder="Special Request (Optional)"
          value={formData.specialRequest}
          onChange={handleChange}
        ></textarea>

        {/* Submit */}

        <button type="submit">
          Confirm Appointment
        </button>

        {/* Message */}

        {message && <p>{message}</p>}

      </form>

    </section>
  );
}

export default Booking;
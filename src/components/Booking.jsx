import { useEffect, useState } from "react";
import "../styles/Booking.css";

const API_BASE =
  "https://salon-appointment-system-production.up.railway.app";

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

  // ==========================================
  // LOAD SERVICES
  // ==========================================

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/services`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load services"
          );
        }

        setServices(
          data.filter(
            (service) =>
              Number(service.is_active) === 1
          )
        );
      } catch (error) {
        console.error(
          "BOOKING SERVICES LOAD ERROR:",
          error
        );
      }
    };

    loadServices();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // SERVICE SELECTION
  // ==========================================

  const handleServiceChange = (serviceName) => {
    setFormData((prev) => {
      if (prev.service.includes(serviceName)) {
        return {
          ...prev,
          service: prev.service.filter(
            (item) => item !== serviceName
          ),
        };
      }

      return {
        ...prev,
        service: [
          ...prev.service,
          serviceName,
        ],
      };
    });
  };

  // ==========================================
  // SUBMIT APPOINTMENT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.service.length === 0) {
      setMessage(
        "Please select at least one service."
      );
      return;
    }

    setMessage("Booking your appointment...");

    try {
      const response = await fetch(
        `${API_BASE}/api/appointments`,
        {
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

      if (!response.ok) {
        setMessage(
          data.message ||
            "Something went wrong."
        );
        return;
      }

      setMessage(
        "Appointment booked successfully!"
      );

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

      setShowServices(false);

    } catch (error) {
      console.error(
        "BOOKING ERROR:",
        error
      );

      setMessage(
        "Unable to connect to the server."
      );
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section
      className="booking-section"
      id="booking"
    >

      {/* AMBIENT LIGHT */}
      <div className="booking-glow booking-glow-left"></div>

      <div className="booking-glow booking-glow-right"></div>


      <div className="booking-layout">

        {/* =================================
            LEFT SIDE
        ================================= */}

        <div className="booking-info">

          <p className="booking-label">
            LUXE EXPERIENCE
          </p>

          <h1>
            Reserve Your
            <span> Moment.</span>
          </h1>

          <p className="booking-intro">
            Take a moment for yourself. Choose
            your preferred service, date and time
            and let our experts take care of the
            rest.
          </p>


          <div className="booking-features">

            <div className="booking-feature">

              <div className="feature-icon">
                ✦
              </div>

              <div>
                <h3>
                  Personalized Service
                </h3>

                <p>
                  Tailored beauty experiences
                  designed for you.
                </p>
              </div>

            </div>


            <div className="booking-feature">

              <div className="feature-icon">
                ✦
              </div>

              <div>
                <h3>
                  Expert Professionals
                </h3>

                <p>
                  Experienced stylists
                  dedicated to your look.
                </p>
              </div>

            </div>


            <div className="booking-feature">

              <div className="feature-icon">
                ✦
              </div>

              <div>
                <h3>
                  Premium Experience
                </h3>

                <p>
                  Relax in an elegant and
                  comfortable environment.
                </p>
              </div>

            </div>

          </div>


          <div className="booking-line"></div>

          <p className="booking-note">
            Your time. Your style. Your experience.
          </p>

        </div>


        {/* =================================
            RIGHT SIDE - BOOKING FORM
        ================================= */}

        <div className="booking-form-wrapper">

          <div className="booking-form-header">

            <span>
              BOOK AN APPOINTMENT
            </span>

            <h2>
              Let's Get You Ready
            </h2>

            <p>
              Fill in your details below.
            </p>

          </div>


          <form
            className="booking-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />


            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />


            {/* PHONE */}

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />


            {/* GENDER */}

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>


            {/* SERVICES */}

            <div className="service-dropdown">

              <button
                type="button"
                className="service-dropdown-button"
                onClick={() =>
                  setShowServices(
                    !showServices
                  )
                }
              >

                <span>
                  {formData.service.length > 0
                    ? formData.service.join(", ")
                    : "Select Service"}
                </span>

                <span
                  className={`service-arrow ${
                    showServices
                      ? "open"
                      : ""
                  }`}
                ></span>

              </button>


              {showServices && (

                <div className="service-options">

                  {services.length > 0 ? (

                    services.map(
                      (service) => (

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

                      )
                    )

                  ) : (

                    <div className="service-option">
                      No services available
                    </div>

                  )}

                </div>

              )}

            </div>


            {/* DATE */}

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />


            {/* TIME */}

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />


            {/* SPECIAL REQUEST */}

            <textarea
              name="specialRequest"
              rows="5"
              placeholder="Special Request (Optional)"
              value={formData.specialRequest}
              onChange={handleChange}
            ></textarea>


            {/* SUBMIT */}

            <button type="submit">
              Confirm Appointment
            </button>


            {/* MESSAGE */}

            {message && (
              <p className="booking-message">
                {message}
              </p>
            )}

          </form>

        </div>

      </div>

    </section>
  );
}

export default Booking;
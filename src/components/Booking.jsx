import "../styles/Booking.css";

function Booking() {
  return (
    <section className="booking" id="booking">

      <h2>Book Your Appointment</h2>

      <p>
        Schedule your salon visit in just a few simple steps.
      </p>

      <form className="booking-form">

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="tel"
          placeholder="Phone Number"
        />

        <select>
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
         </select>

        <select>

          <option>Select Service</option>

          <option>Hair Cut</option>

          <option>Hair Spa</option>

          <option>Hair Coloring</option>

          <option>Facial</option>

          <option>Bridal Makeup</option>

          <option>Party Makeup</option>
          
          <option>Manicure</option>

         <option>pedicure</option>

         <option>Beard Grooming</option>

        </select>

        <input type="date"/>

        <input type="time"/>

        <textarea
          rows="5"
          placeholder="Special Request (Optional)"
        ></textarea>

        <button type="submit">

          Confirm Appointment

        </button>

      </form>

    </section>
  );
}

export default Booking;
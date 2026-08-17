import { useEffect, useState } from "react";
import "../styles/AdminAppointments.css";

function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Update appointment status
    const handleStatusChange = async (id, status) => {
    console.log("STATUS CHANGE:", id, status);

    try {
        const response = await fetch(
            `https://salon-appointment-system-production.up.railway.app/api/appointments/${id}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: status
                })
            }
        );

        console.log("SERVER RESPONSE:", response.status);

        const data = await response.json();

        console.log("SERVER DATA:", data);

        if (!response.ok) {
            alert(data.message || "Failed to update status.");
            return;
        }

        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.id === id
                    ? {
                        ...appointment,
                        status: status
                    }
                    : appointment
            )
        );

    } catch (err) {
        console.error("STATUS UPDATE ERROR:", err);
        alert("Unable to connect to the server.");
    }
};

    // Load appointments
    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const response = await fetch(
"https://salon-appointment-system-production.up.railway.app/api/appointments"                );

                const data = await response.json();

                if (response.ok) {
                    setAppointments(data);
                } else {
                    setError("Failed to load appointments.");
                }

            } catch (err) {
                console.error(err);
                setError("Unable to connect to the server.");

            } finally {
                setLoading(false);
            }
        };

        loadAppointments();
    }, []);

    return (
        <div className="admin-appointments">

            <header className="admin-appointments-header">

                <div>
                    <h1>Luxe Salon</h1>
                    <p>Admin Panel</p>
                </div>

                <button
                    onClick={() => {
                        window.location.href = "/admin/dashboard";
                    }}
                >
                    Dashboard
                </button>

            </header>

            <main className="appointments-content">

                <h2>Appointments</h2>

                <p className="appointments-subtitle">
                    Manage all customer appointments
                </p>

                {loading && (
                    <p className="appointments-status">
                        Loading appointments...
                    </p>
                )}

                {error && (
                    <p className="appointments-error">
                        {error}
                    </p>
                )}

                {!loading && !error && appointments.length === 0 && (
                    <p className="appointments-status">
                        No appointments found.
                    </p>
                )}

                {!loading && !error && appointments.length > 0 && (

                    <div className="appointments-table-container">

                        <table className="appointments-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Special Request</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {appointments.map((appointment) => (

                                    <tr key={appointment.id}>

                                        <td>
                                            {appointment.id}
                                        </td>

                                        <td>
                                            {appointment.name}
                                        </td>

                                        <td>
                                            {appointment.email}
                                        </td>

                                        <td>
                                            {appointment.phone}
                                        </td>

                                        <td>
                                            {appointment.gender}
                                        </td>

                                        <td>
                                            <span className="service-badge">
                                                {appointment.service}
                                            </span>
                                        </td>

                                        <td>
                                            {appointment.date
                                                ? new Date(
                                                    appointment.date
                                                ).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td>
                                            {appointment.time}
                                        </td>

                                        <td>
                                            {appointment.specialrequest ||
                                                appointment.specialRequest ||
                                                "-"}
                                        </td>

                                        <td>
                                            <select
                                                className={`status-select ${
                                                    appointment.status?.toLowerCase() ||
                                                    "pending"
                                                }`}
                                                value={
                                                    appointment.status ||
                                                    "Pending"
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        appointment.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Confirmed">
                                                    Confirmed
                                                </option>

                                                <option value="Completed">
                                                    Completed
                                                </option>

                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </td>

                                        <td>
                                            <button
                                               className="delete-btn"
                                               onClick={async () => {

                                                  const confirmed = window.confirm(
                                                  `Are you sure you want to delete appointment #${appointment.id}?`
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await fetch(
                `https://salon-appointment-system-production.up.railway.app/api/appointments/${appointment.id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            console.log("DELETE RESPONSE:", data);

            if (!response.ok) {
                alert(data.message || "Failed to delete appointment.");
                return;
            }

            // Remove deleted appointment from the screen
            setAppointments((prevAppointments) =>
                prevAppointments.filter(
                    (item) => item.id !== appointment.id
                )
            );

            alert("Appointment deleted successfully.");

        } catch (err) {

            console.error("DELETE ERROR:", err);

            alert("Unable to connect to the server.");
        }
    }}
>
    Delete
</button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminAppointments;
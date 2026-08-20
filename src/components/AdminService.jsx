import { useEffect, useState } from "react";
import "../styles/AdminService.css";

const API_URL =
    "https://salon-appointment-system-production.up.railway.app/api/services";

function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");

    const [editingId, setEditingId] = useState(null);

    // ==============================
    // LOAD SERVICES
    // ==============================
    useEffect(() => {
        const loadServices = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load services"
                    );
                }

                setServices(data);
            } catch (error) {
                console.error("SERVICES LOAD ERROR:", error);
                alert("Unable to load services.");
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    // ==============================
    // ADD / UPDATE SERVICE
    // ==============================
    const handleSubmit = async () => {
        if (!name || !price || !duration) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const url = editingId
                ? `${API_URL}/${editingId}`
                : API_URL;

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    price,
                    duration,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                        `Failed to ${
                            editingId ? "update" : "add"
                        } service.`
                );
                return;
            }

            alert(
                editingId
                    ? "Service updated successfully!"
                    : "Service added successfully!"
            );

            // Reset form
            setName("");
            setPrice("");
            setDuration("");
            setEditingId(null);

            // Reload services
            const servicesResponse = await fetch(API_URL);
            const servicesData = await servicesResponse.json();

            if (servicesResponse.ok) {
                setServices(servicesData);
            }
        } catch (error) {
            console.error(
                editingId
                    ? "UPDATE SERVICE ERROR:"
                    : "ADD SERVICE ERROR:",
                error
            );

            alert("Unable to connect to the server.");
        }
    };

    // ==============================
    // EDIT SERVICE
    // ==============================
    const handleEdit = (service) => {
        setEditingId(service.id);
        setName(service.name);
        setPrice(service.price);
        setDuration(service.duration);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // ==============================
    // CANCEL EDIT
    // ==============================
    const handleCancelEdit = () => {
        setEditingId(null);
        setName("");
        setPrice("");
        setDuration("");
    };

    // ==============================
    // DELETE SERVICE
    // ==============================
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                        "Failed to delete service."
                );
                return;
            }

            alert("Service deleted successfully!");

            setServices((prevServices) =>
                prevServices.filter(
                    (service) => service.id !== id
                )
            );
        } catch (error) {
            console.error(
                "DELETE SERVICE ERROR:",
                error
            );

            alert("Unable to connect to the server.");
        }
    };

    return (
        <div className="admin-services-page">

            {/* HEADER */}
            <div className="services-header">
                <div>
                    <h1>Manage Services</h1>
                    <p>
                        Add, edit and manage salon services.
                    </p>
                </div>

                <button
                    type="button"
                    className="dashboard-button"
                    onClick={() => {
                        window.location.href =
                            "/admin/dashboard";
                    }}
                >
                    Dashboard
                </button>
            </div>

            {/* ADD / EDIT FORM */}
            <div className="service-form-card">

                <h2>
                    {editingId
                        ? "Edit Service"
                        : "Add New Service"}
                </h2>

                <div className="service-form">

                    <input
                        type="text"
                        placeholder="Service name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Duration (minutes)"
                        value={duration}
                        onChange={(e) =>
                            setDuration(e.target.value)
                        }
                    />

                    <div className="form-buttons">

                        <button
                            type="button"
                            className={
                                editingId
                                    ? "update-button"
                                    : "add-button"
                            }
                            onClick={handleSubmit}
                        >
                            {editingId
                                ? "Update Service"
                                : "Add Service"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={
                                    handleCancelEdit
                                }
                            >
                                Cancel
                            </button>
                        )}

                    </div>
                </div>
            </div>

            {/* SERVICES LIST */}
            <div className="services-list-card">

                <div className="services-list-header">
                    <h2>All Services</h2>

                    <span>
                        {services.length} service
                        {services.length !== 1
                            ? "s"
                            : ""}
                    </span>
                </div>

                {loading ? (
                    <p className="loading-text">
                        Loading services...
                    </p>
                ) : services.length === 0 ? (
                    <p className="empty-text">
                        No services found.
                    </p>
                ) : (
                    <div className="services-table">

                        {/* TABLE HEADER */}
                        <div className="service-table-header">
                            <div>Service</div>
                            <div>Price</div>
                            <div>Duration</div>
                            <div>Actions</div>
                        </div>

                        {/* SERVICES */}
                        {services.map((service) => (
                            <div
                                className="service-table-row"
                                key={service.id}
                            >

                                <div className="service-name">
                                    <strong>
                                        {service.name}
                                    </strong>
                                </div>

                                <div className="service-price">
                                    ₹{service.price}
                                </div>

                                <div className="service-duration">
                                    {service.duration}{" "}
                                    minutes
                                </div>

                                <div className="service-actions">

                                    <button
                                        type="button"
                                        className="edit-button"
                                        onClick={() =>
                                            handleEdit(
                                                service
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(
                                                service.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default AdminServices;
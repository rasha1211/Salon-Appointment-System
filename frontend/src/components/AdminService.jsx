import { useEffect, useState } from "react";
import "../styles/AdminService.css";

function AdminServices() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");

    const [editingId, setEditingId] = useState(null);

    const handleAddService = async () => {

        if (!name || !price || !duration) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/api/services",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        price,
                        duration
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to add service.");
                return;
            }

            alert("Service added successfully!");

            setName("");
            setPrice("");
            setDuration("");

            const servicesResponse = await fetch(
                "http://localhost:5000/api/services"
            );

            const servicesData = await servicesResponse.json();

            if (servicesResponse.ok) {
                setServices(servicesData);
            }

        } catch (error) {

            console.error("ADD SERVICE ERROR:", error);

            alert("Unable to connect to the server.");

        }
    };


    const handleEdit = (service) => {

        setEditingId(service.id);
        setName(service.name);
        setPrice(service.price);
        setDuration(service.duration);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const handleUpdateService = async () => {

        if (!name || !price || !duration) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/api/services/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        price,
                        duration,
                        is_active: 1
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to update service.");
                return;
            }

            alert("Service updated successfully!");

            setEditingId(null);
            setName("");
            setPrice("");
            setDuration("");

            const servicesResponse = await fetch(
                "http://localhost:5000/api/services"
            );

            const servicesData = await servicesResponse.json();

            if (servicesResponse.ok) {
                setServices(servicesData);
            }

        } catch (error) {

            console.error("UPDATE SERVICE ERROR:", error);

            alert("Unable to connect to the server.");

        }
    };


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/api/services/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to delete service.");
                return;
            }

            alert("Service deleted successfully!");

            const servicesResponse = await fetch(
                "http://localhost:5000/api/services"
            );

            const servicesData = await servicesResponse.json();

            if (servicesResponse.ok) {
                setServices(servicesData);
            }

        } catch (error) {

            console.error("DELETE SERVICE ERROR:", error);

            alert("Unable to connect to the server.");

        }
    };


    const handleCancelEdit = () => {

        setEditingId(null);
        setName("");
        setPrice("");
        setDuration("");

    };


    useEffect(() => {

        const loadServices = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/services"
                );

                const data = await response.json();

                if (response.ok) {
                    setServices(data);
                }

            } catch (error) {

                console.error("SERVICES LOAD ERROR:", error);

            } finally {

                setLoading(false);

            }
        };

        loadServices();

    }, []);


    return (
        <div className="admin-services">

            <header className="admin-header">

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


            <main className="admin-services-content">

                <h2>Manage Services</h2>


                <div className="admin-service-form">

                    <h2>
                        {editingId
                            ? "Edit Service"
                            : "Add New Service"}
                    </h2>


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


                    {editingId ? (

                        <div className="service-form-buttons">

                            <button
                                onClick={handleUpdateService}
                            >
                                Update Service
                            </button>

                            <button
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>

                        </div>

                    ) : (

                        <button onClick={handleAddService}>
                            Add Service
                        </button>

                    )}

                </div>


                {loading ? (

                    <p>Loading services...</p>

                ) : (

                    <div className="admin-service-list">

                        {services.map((service) => (

                            <div
                                className="admin-service-card"
                                key={service.id}
                            >

                                <div>

                                    <h3>
                                        {service.name}
                                    </h3>

                                    <p>
                                        ₹{service.price}
                                    </p>

                                    <p>
                                        {service.duration} minutes
                                    </p>

                                </div>


                                <div className="service-actions">

                                    <button
                                        onClick={() =>
                                            handleEdit(service)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(service.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminServices;
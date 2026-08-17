import { useEffect, useState } from "react";

function AdminServices() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    
   
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
    <div>

        <h1>Manage Services</h1>

        <div>
            <h2>Add New Service</h2>

            <input
                type="text"
                placeholder="Service name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                type="number"
                placeholder="Duration (minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />

        <button onClick={handleAddService}>
    Add Service
</button>
        </div>

        {loading ? (
                <p>Loading services...</p>
            ) : (
                <div>

                    {services.map((service) => (
                        <div key={service.id}>

                            <h3>{service.name}</h3>

                            <p>
                                ₹{service.price} · {service.duration} minutes
                            </p>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default AdminServices;
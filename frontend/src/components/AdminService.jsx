import { useEffect, useState } from "react";
import "../styles/AdminService.css";

const API_URL =
    "https://salon-appointment-system-production.up.railway.app/api/services";

// ==========================================
// CLOUDINARY CONFIG
// ==========================================

const CLOUDINARY_CLOUD_NAME = "e6eabkli";
const CLOUDINARY_UPLOAD_PRESET = "salon_services";

function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const [uploadingImage, setUploadingImage] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // ==========================================
    // LOAD SERVICES
    // ==========================================

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

    // ==========================================
    // UPLOAD IMAGE TO CLOUDINARY
    // ==========================================

    const uploadImage = async () => {
        if (!image) {
            return imageUrl;

        }

        // IMPORTANT:
        // These are placeholder values only.
        // Our actual values are above.
        

        try {
            setUploadingImage(true);

            const formData = new FormData();

            formData.append("file", image);
            formData.append(
                "upload_preset",
                CLOUDINARY_UPLOAD_PRESET
            );

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("CLOUDINARY ERROR:", data);

                alert(
                    data.error?.message ||
                        "Failed to upload image."
                );

                return null;
            }

            console.log(
                "CLOUDINARY IMAGE URL:",
                data.secure_url
            );

            return data.secure_url;
        } catch (error) {
            console.error("IMAGE UPLOAD ERROR:", error);

            alert("Unable to upload image.");

            return null;
        } finally {
            setUploadingImage(false);
        }
    };

    // ==========================================
    // ADD / UPDATE SERVICE
    // ==========================================

    const handleSubmit = async () => {
        if (
            !name.trim() ||
            !category.trim() ||
            !description.trim() ||
            !price ||
            !duration
        ) {
            alert("Please fill all fields.");
            return;
        }

        try {
            // --------------------------------------
            // UPLOAD IMAGE
            // --------------------------------------

            let finalImageUrl = imageUrl;

            if (image) {
                finalImageUrl = await uploadImage();

                if (!finalImageUrl) {
                    return;
                }
            }

            console.log(
                "FINAL IMAGE URL:",
                finalImageUrl
            );

            // --------------------------------------
            // API REQUEST
            // --------------------------------------

            const url = editingId
                ? `${API_URL}/${editingId}`
                : API_URL;

            const method = editingId
                ? "PUT"
                : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    category: category.trim(),
                    description: description.trim(),
                    image_url: finalImageUrl || null,
                    price,
                    duration,
                    is_active: 1,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                        `Failed to ${
                            editingId
                                ? "update"
                                : "add"
                        } service.`
                );

                return;
            }

            alert(
                editingId
                    ? "Service updated successfully!"
                    : "Service added successfully!"
            );

            // --------------------------------------
            // RESET FORM
            // --------------------------------------

            setName("");
            setCategory("");
            setDescription("");
            setPrice("");
            setDuration("");
            setImage(null);
            setImageUrl("");
            setEditingId(null);

            const fileInput =
                document.getElementById(
                    "service-image"
                );

            if (fileInput) {
                fileInput.value = "";
            }

            // --------------------------------------
            // RELOAD SERVICES
            // --------------------------------------

            const servicesResponse =
                await fetch(API_URL);

            const servicesData =
                await servicesResponse.json();

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

            alert(
                "Unable to connect to the server."
            );
        }
    };

    // ==========================================
    // EDIT SERVICE
    // ==========================================

    const handleEdit = (service) => {
        setEditingId(service.id);

        setName(service.name || "");
        setCategory(service.category || "");
        setDescription(service.description || "");
        setPrice(service.price || "");
        setDuration(service.duration || "");
        setImage(null);
        setImageUrl(service.image_url || "");

        const fileInput =
            document.getElementById(
                "service-image"
            );

        if (fileInput) {
            fileInput.value = "";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const handleCancelEdit = () => {
        setEditingId(null);

        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setDuration("");
        setImage(null);
        setImageUrl("");

        const fileInput =
            document.getElementById(
                "service-image"
            );

        if (fileInput) {
            fileInput.value = "";
        }
    };

    // ==========================================
    // DELETE SERVICE
    // ==========================================

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

            alert(
                "Service deleted successfully!"
            );

            setServices((prevServices) =>
                prevServices.filter(
                    (service) =>
                        service.id !== id
                )
            );
        } catch (error) {
            console.error(
                "DELETE SERVICE ERROR:",
                error
            );

            alert(
                "Unable to connect to the server."
            );
        }
    };

    // ==========================================
    // IMAGE SELECT
    // ==========================================

    const handleImageChange = (event) => {
        const selectedFile =
            event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        // --------------------------------------
        // CHECK IMAGE TYPE
        // --------------------------------------

        if (!selectedFile.type.startsWith("image/")) {
            alert(
                "Please select a valid image file."
            );

            event.target.value = "";
            return;
        }

        // --------------------------------------
        // CHECK IMAGE SIZE
        // --------------------------------------

        const maxSize =
            5 * 1024 * 1024;

        if (selectedFile.size > maxSize) {
            alert(
                "Image size must be less than 5 MB."
            );

            event.target.value = "";
            return;
        }

        setImage(selectedFile);
    };

    return (
        <div className="admin-services-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="services-header">

                <div>
                    <h1>
                        Manage Services
                    </h1>

                    <p>
                        Add, edit and manage salon
                        services.
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

            {/* ==========================================
                ADD / EDIT FORM
            ========================================== */}

            <div className="service-form-card">

                <h2>
                    {editingId
                        ? "Edit Service"
                        : "Add New Service"}
                </h2>

                <div className="service-form">

                    {/* SERVICE NAME */}

                    <input
                        type="text"
                        placeholder="Service name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    {/* CATEGORY */}

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                    />

                    {/* DESCRIPTION */}

                    <textarea
                        placeholder="Service description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        rows="4"
                    />

                    {/* PRICE */}

                    <input
                        type="number"
                        placeholder="Price"
                        min="0"
                        value={price}
                        onChange={(e) =>
                            setPrice(
                                e.target.value
                            )
                        }
                    />

                    {/* DURATION */}

                    <input
                        type="number"
                        placeholder="Duration (minutes)"
                        min="1"
                        value={duration}
                        onChange={(e) =>
                            setDuration(
                                e.target.value
                            )
                        }
                    />

                    {/* IMAGE */}

                    <div className="service-image-upload">

                        <label htmlFor="service-image">
                            Service Image
                        </label>

                        <input
                            id="service-image"
                            type="file"
                            accept="image/*"
                            onChange={
                                handleImageChange
                            }
                        />

                        {image && (
                            <p>
                                Selected:{" "}
                                {image.name}
                            </p>
                        )}

                        {editingId &&
                            imageUrl &&
                            !image && (
                                <div>
                                    <p>
                                        Current image:
                                    </p>

                                    <img
                                        src={imageUrl}
                                        alt="Current service"
                                        style={{
                                            width:
                                                "120px",
                                            height:
                                                "80px",
                                            objectFit:
                                                "cover",
                                            borderRadius:
                                                "8px",
                                        }}
                                    />
                                </div>
                            )}

                    </div>

                    {/* BUTTONS */}

                    <div className="form-buttons">

                        <button
                            type="button"
                            className={
                                editingId
                                    ? "update-button"
                                    : "add-button"
                            }
                            onClick={
                                handleSubmit
                            }
                            disabled={
                                uploadingImage
                            }
                        >
                            {uploadingImage
                                ? "Uploading Image..."
                                : editingId
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
                                disabled={
                                    uploadingImage
                                }
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </div>

            </div>

            {/* ==========================================
                SERVICES LIST
            ========================================== */}

            <div className="services-list-card">

                <div className="services-list-header">

                    <h2>
                        All Services
                    </h2>

                    <span>
                        {services.length}{" "}
                        service
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

                            <div>
                                Service
                            </div>

                            <div>
                                Category
                            </div>

                            <div>
                                Price
                            </div>

                            <div>
                                Duration
                            </div>

                            <div>
                                Actions
                            </div>

                        </div>

                        {/* SERVICES */}

                        {services.map(
                            (service) => (

                                <div
                                    className="service-table-row"
                                    key={
                                        service.id
                                    }
                                >

                                    <div className="service-name">

                                        <strong>
                                            {
                                                service.name
                                            }
                                        </strong>

                                        {service.description && (
                                            <small>
                                                {
                                                    service.description
                                                }
                                            </small>
                                        )}

                                    </div>

                                    <div className="service-category">

                                        {
                                            service.category ||
                                                "-"
                                        }

                                    </div>

                                    <div className="service-price">

                                        ₹
                                        {
                                            service.price
                                        }

                                    </div>

                                    <div className="service-duration">

                                        {
                                            service.duration
                                        }{" "}
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

                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminServices;
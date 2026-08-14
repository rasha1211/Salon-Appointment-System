import { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboardData = async () => {

            try {

                // Load dashboard statistics
                const statsResponse = await fetch(
                    "http://localhost:5000/api/appointments/stats"
                );

                const statsData = await statsResponse.json();

                if (statsResponse.ok) {
                    setStats(statsData);
                }

            } catch (error) {

                console.error(
                    "DASHBOARD DATA ERROR:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadDashboardData();

    }, []);


    return (
        <div className="admin-dashboard">

            {/* HEADER */}

            <header className="admin-header">

                <div>
                    <h1>Luxe Salon</h1>
                    <p>Admin Panel</p>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("adminLoggedIn");
                        window.location.href = "/admin/login";
                    }}
                >
                    Logout
                </button>

            </header>


            {/* MAIN CONTENT */}

            <main className="admin-content">

                <h2>Dashboard</h2>

                <p className="admin-welcome">
                    Welcome to the Luxe Salon administration panel.
                </p>


                {/* STATISTICS */}

                <div className="admin-stats">

                    {/* TOTAL */}

                    <div className="stat-card total-card">

                        <div className="stat-icon">
                            📅
                        </div>

                        <div>
                            <h3>Total Appointments</h3>

                            <p>
                                {loading ? "..." : stats.total}
                            </p>
                        </div>

                    </div>


                    {/* PENDING */}

                    <div className="stat-card pending-card">

                        <div className="stat-icon">
                            ⏳
                        </div>

                        <div>
                            <h3>Pending</h3>

                            <p>
                                {loading ? "..." : stats.pending}
                            </p>
                        </div>

                    </div>


                    {/* CONFIRMED */}

                    <div className="stat-card confirmed-card">

                        <div className="stat-icon">
                            ✓
                        </div>

                        <div>
                            <h3>Confirmed</h3>

                            <p>
                                {loading ? "..." : stats.confirmed}
                            </p>
                        </div>

                    </div>


                    {/* COMPLETED */}

                    <div className="stat-card completed-card">

                        <div className="stat-icon">
                            ★
                        </div>

                        <div>
                            <h3>Completed</h3>

                            <p>
                                {loading ? "..." : stats.completed}
                            </p>
                        </div>

                    </div>


                    {/* CANCELLED */}

                    <div className="stat-card cancelled-card">

                        <div className="stat-icon">
                            ×
                        </div>

                        <div>
                            <h3>Cancelled</h3>

                            <p>
                                {loading ? "..." : stats.cancelled}
                            </p>
                        </div>

                    </div>

                </div>


                {/* ADMIN OPTIONS */}

                <div className="admin-cards">

                    {/* APPOINTMENTS */}

                    <div className="admin-card">

                        <h3>Appointments</h3>

                        <p>
                            Manage customer appointments
                        </p>

                        <button
                            onClick={() => {
                                window.location.href =
                                    "/admin/appointments";
                            }}
                        >
                            View Appointments
                        </button>

                    </div>


                    {/* SERVICES */}

                    <div className="admin-card">

                        <h3>Services</h3>

                        <p>
                            Manage salon services
                        </p>

                        <button
                            onClick={() => {
                                window.location.href =
                                    "/admin/services";
                            }}
                        >
                            Manage Services
                        </button>

                    </div>


                    

                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;
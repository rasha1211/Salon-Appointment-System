import { useState } from "react";
import "../styles/AdminLogin.css";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "admin123") {
            localStorage.setItem("adminLoggedIn", "true");

            window.location.href = "/admin/dashboard";
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="admin-login-page">

            <div className="admin-login-box">

                <div className="admin-logo">
                    Luxe Salon
                </div>

                <h1>Admin Panel</h1>

                <p>Sign in to manage your salon</p>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <div className="admin-login-error">
                            {error}
                        </div>
                    )}

                    <button type="submit">
                        Login
                    </button>

                </form>

                <span className="admin-back">
                    Luxe Salon Administration
                </span>

            </div>

        </div>
    );
}

export default AdminLogin;
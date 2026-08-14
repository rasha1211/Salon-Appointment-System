const express = require("express");
const cors = require("cors");

const appointmentRoutes = require("./routes/appointmentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());


// ==========================================
// SERVER TEST
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "Salon Appointment System Backend is running!"
    });
});


// ==========================================
// DIRECT TEST ROUTE
// ==========================================

app.get("/server-test", (req, res) => {

    console.log("SERVER TEST ROUTE HIT");

    res.json({
        message: "Server test is working!"
    });
});


// ==========================================
// APPOINTMENT ROUTES
// ==========================================

console.log("=================================");
console.log("LOADING APPOINTMENT ROUTES");
console.log("ROUTE FILE:");
console.log(require.resolve("./routes/appointmentRoutes"));
console.log("=================================");

app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log("=================================");
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("=================================");
});
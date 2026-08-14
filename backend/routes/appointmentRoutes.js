const express = require("express");
const db = require("../config/db");

const router = express.Router();


// ==========================================
// TEST APPOINTMENT ROUTE
// ==========================================

router.get("/", (req, res) => {
    res.json({
        message: "Appointment API is working!"
    });
});


// ==========================================
// BOOK APPOINTMENT
// ==========================================

router.post("/", (req, res) => {

    console.log("=================================");
    console.log("POST REQUEST RECEIVED");
    console.log("DATA RECEIVED:", req.body);
    console.log("=================================");

    const {
        name,
        email,
        phone,
        gender,
        service,
        date,
        time,
        specialRequest
    } = req.body;

    const sql = `
        INSERT INTO appointments
        (name, email, phone, gender, service, date, time, specialrequest)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        email,
        phone,
        gender,
        service,
        date,
        time,
        specialRequest
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error("DATABASE ERROR:", err);

            return res.status(500).json({
                message: "Failed to book appointment.",
                error: err.message
            });
        }

        console.log("APPOINTMENT SAVED TO MYSQL");
        console.log("Inserted ID:", result.insertId);

        res.status(201).json({
            message: "Appointment booked successfully!",
            appointmentId: result.insertId
        });
    });
});


// ==========================================
// GET ALL APPOINTMENTS
// ==========================================

router.get("/all", (req, res) => {

    console.log("GET ALL APPOINTMENTS REQUEST RECEIVED");

    const sql = `
        SELECT *
        FROM appointments
        ORDER BY date DESC, time DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error("DATABASE ERROR:", err.message);

            return res.status(500).json({
                message: "Failed to fetch appointments.",
                error: err.message
            });
        }

        console.log("APPOINTMENTS FETCHED:", results.length);

        res.json(results);
    });
});


// ==========================================
// TEST STATUS ROUTE
// ==========================================

router.get("/test-status", (req, res) => {

    console.log("=================================");
    console.log("TEST STATUS ROUTE HIT");
    console.log("=================================");

    res.json({
        message: "Status route is registered!"
    });
});


// ==========================================
// UPDATE APPOINTMENT STATUS
// ==========================================

router.put("/:id/status", (req, res) => {

    console.log("=================================");
    console.log("STATUS UPDATE ROUTE HIT");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("=================================");

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
    ];

    // Check status
    if (!allowedStatuses.includes(status)) {

        console.log("INVALID STATUS:", status);

        return res.status(400).json({
            message: "Invalid status."
        });
    }

    const sql = `
        UPDATE appointments
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {

            console.error("STATUS DATABASE ERROR:", err);

            return res.status(500).json({
                message: "Failed to update appointment status.",
                error: err.message
            });
        }

        console.log("=================================");
        console.log("STATUS UPDATED SUCCESSFULLY");
        console.log("ID:", id);
        console.log("NEW STATUS:", status);
        console.log("ROWS CHANGED:", result.affectedRows);
        console.log("=================================");

        res.json({
            message: "Appointment status updated successfully.",
            id: id,
            status: status
        });
    });
});


// ==========================================
// EXPORT ROUTER
// ==========================================
// ==========================================
// DELETE APPOINTMENT
// ==========================================

router.delete("/:id", (req, res) => {

    console.log("=================================");
    console.log("DELETE APPOINTMENT ROUTE HIT");
    console.log("ID:", req.params.id);
    console.log("=================================");

    const { id } = req.params;

    const sql = `
        DELETE FROM appointments
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error("DELETE DATABASE ERROR:", err);

            return res.status(500).json({
                message: "Failed to delete appointment.",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            console.log("APPOINTMENT NOT FOUND:", id);

            return res.status(404).json({
                message: "Appointment not found."
            });
        }

        console.log("APPOINTMENT DELETED SUCCESSFULLY");
        console.log("ID:", id);
        console.log("ROWS DELETED:", result.affectedRows);

        res.json({
            message: "Appointment deleted successfully.",
            id: id
        });
    });
});
// ==========================================
// ADMIN DASHBOARD STATISTICS
// ==========================================

router.get("/stats", (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total,
            SUM(status = 'Pending') AS pending,
            SUM(status = 'Confirmed') AS confirmed,
            SUM(status = 'Completed') AS completed,
            SUM(status = 'Cancelled') AS cancelled
        FROM appointments
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error("DASHBOARD STATS ERROR:", err);

            return res.status(500).json({
                message: "Failed to load dashboard statistics.",
                error: err.message
            });
        }

        const stats = results[0];

        res.json({
            total: Number(stats.total) || 0,
            pending: Number(stats.pending) || 0,
            confirmed: Number(stats.confirmed) || 0,
            completed: Number(stats.completed) || 0,
            cancelled: Number(stats.cancelled) || 0
        });
    });
});
// ==========================================
// RECENT APPOINTMENTS
// ==========================================

router.get("/recent", (req, res) => {

    const sql = `
        SELECT
            id,
            name,
            service,
            date,
            time,
            status
        FROM appointments
        ORDER BY created_at DESC
        LIMIT 5
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error("RECENT APPOINTMENTS ERROR:", err);

            return res.status(500).json({
                message: "Failed to load recent appointments.",
                error: err.message
            });
        }

        res.json(results);
    });
});
module.exports = router;
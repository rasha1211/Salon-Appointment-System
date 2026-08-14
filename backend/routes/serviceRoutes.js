const express = require("express");
const db = require("../config/db");

const router = express.Router();

// ==========================================
// GET ALL SERVICES
// ==========================================

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM services
        ORDER BY id ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error("SERVICES DATABASE ERROR:", err);

            return res.status(500).json({
                message: "Failed to fetch services.",
                error: err.message
            });
        }

        res.json(results);
    });
});


// ==========================================
// ADD SERVICE
// ==========================================

router.post("/", (req, res) => {

    const {
        name,
        price,
        duration
    } = req.body;

    if (!name || !price || !duration) {

        return res.status(400).json({
            message: "Name, price and duration are required."
        });
    }

    const sql = `
        INSERT INTO services
        (name, price, duration, is_active)
        VALUES (?, ?, ?, 1)
    `;

    db.query(
        sql,
        [name, price, duration],
        (err, result) => {

            if (err) {

                console.error(
                    "ADD SERVICE DATABASE ERROR:",
                    err
                );

                return res.status(500).json({
                    message: "Failed to add service.",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Service added successfully.",
                serviceId: result.insertId
            });
        }
    );
});


// ==========================================
// UPDATE SERVICE
// ==========================================

router.put("/:id", (req, res) => {

    const { id } = req.params;

    const {
        name,
        price,
        duration,
        is_active
    } = req.body;

    const sql = `
        UPDATE services
        SET
            name = ?,
            price = ?,
            duration = ?,
            is_active = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, price, duration, is_active, id],
        (err, result) => {

            if (err) {

                console.error(
                    "UPDATE SERVICE DATABASE ERROR:",
                    err
                );

                return res.status(500).json({
                    message: "Failed to update service.",
                    error: err.message
                });
            }

            res.json({
                message: "Service updated successfully."
            });
        }
    );
});


// ==========================================
// DELETE SERVICE
// ==========================================

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM services
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error(
                "DELETE SERVICE DATABASE ERROR:",
                err
            );

            return res.status(500).json({
                message: "Failed to delete service.",
                error: err.message
            });
        }

        res.json({
            message: "Service deleted successfully."
        });
    });
});


module.exports = router;
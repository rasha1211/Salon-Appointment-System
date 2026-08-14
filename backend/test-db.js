const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Rasha@12345",
    database: "salon_db"
});

db.connect((err) => {
    if (err) {
        console.error("CONNECTION FAILED:");
        console.error(err.message);
        return;
    }

    console.log("MYSQL CONNECTION SUCCESSFUL!");
    db.end();
});
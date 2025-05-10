const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

// ✅ Register
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    conn.release();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", error: err });
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    conn.release();
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err });
  }
});

// ✅ Get user profile
app.get("/profile", async (req, res) => {
  const { userId } = req.query;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT username, email FROM users WHERE id = ?", [userId]);
    conn.release();
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ✅ Update profile
app.post("/profile/update", async (req, res) => {
  const { userId, username, email } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query("UPDATE users SET username = ?, email = ? WHERE id = ?", [username, email, userId]);
    conn.release();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed", error: err });
  }
});

// ✅ Change password
app.post("/profile/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT password FROM users WHERE id = ?", [userId]);
    if (rows.length === 0 || rows[0].password !== currentPassword) {
      conn.release();
      return res.status(401).json({ success: false, message: "Incorrect current password" });
    }
    await conn.query("UPDATE users SET password = ? WHERE id = ?", [newPassword, userId]);
    conn.release();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Password change failed", error: err });
  }
});

//
// ✅ Travel Plan Routes
//

// 🔹 CREATE travel plan
app.post("/travel-plans", async (req, res) => {
  const { userId, title, description, travelDate } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO travel_plans (user_id, title, description, travel_date, completed) VALUES (?, ?, ?, ?, ?)",
      [userId, title, description, travelDate, false]
    );
    conn.release();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to save travel plan", error: err });
  }
});

// 🔹 READ user travel plans
app.get("/travel-plans", async (req, res) => {
  const { userId } = req.query;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM travel_plans WHERE user_id = ?", [userId]);
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch travel plans", error: err });
  }
});

// 🔹 UPDATE travel plan
app.put("/travel-plans/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, travelDate, completed } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      "UPDATE travel_plans SET title = ?, description = ?, travel_date = ?, completed = ? WHERE id = ?",
      [title, description, travelDate, completed, id]
    );
    conn.release();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update plan", error: err });
  }
});

// 🔹 DELETE travel plan
app.delete("/travel-plans/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM travel_plans WHERE id = ?", [id]);
    conn.release();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete travel plan", error: err });
  }
});

//
// ✅ Start server
//
app.listen(3000, "0.0.0.0", () => {
  console.log("✅ Server running at http://0.0.0.0:3000");
});
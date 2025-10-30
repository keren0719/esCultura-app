const express = require("express");
const cors = require("cors");
const db = require("./db"); // Importamos la conexión a MySQL
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Permite solicitudes desde React
app.use(express.json()); // Para recibir JSON en POST

// Rutas

// ✅ Obtener todos los eventos
app.get("/events", (req, res) => {
  const query = "SELECT * FROM events WHERE status = 'approved'";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Crear un nuevo evento (Organizer)
app.post("/events", (req, res) => {
  const { name, category, date, location, price, age, description, image } = req.body;
  const query = "INSERT INTO events (name, category, date, location, price, age, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [name, category, date, location, price, age, description, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Evento creado correctamente", eventId: result.insertId });
  });
});

// ✅ Registro de usuario
app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;
  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, password, role], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Usuario registrado correctamente", userId: result.insertId });
  });
});

// ✅ Login de usuario
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: "Usuario o contraseña incorrecta" });
    res.json(results[0]);
  });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

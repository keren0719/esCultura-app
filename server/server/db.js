const mysql = require("mysql2");

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: "localhost",       // o la IP de tu servidor MySQL
  user: "TU_USUARIO",      // tu usuario de MySQL
  password: "TU_CONTRASEÑA", // tu contraseña de MySQL
  database: "TU_BASE_DE_DATOS" // nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
    return;
  }
  console.log("Conectado correctamente a la base de datos MySQL");
});

module.exports = connection;

// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

const staticPath = path.join(__dirname, "../../../dist");
app.use(express.static(staticPath));




// Ruta para manejar el POST
app.post("/enviar-mensaje", (req, res) => {
  const { nombre, apellido, email, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ success: false, message: "Faltan campos" });
  }

  const nuevoMensaje = {
    nombre,
    apellido,
    email,
    mensaje,
    date: new Date().toISOString(),
  };

  const filePath = path.join(__dirname, "mensajes.json");
  let mensajes = [];

  if (fs.existsSync(filePath)) {
    mensajes = JSON.parse(fs.readFileSync(filePath));
  }

  mensajes.push(nuevoMensaje);
  fs.writeFileSync(filePath, JSON.stringify(mensajes, null, 2));

  res.json({ success: true, message: "Mensaje guardado con éxito" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

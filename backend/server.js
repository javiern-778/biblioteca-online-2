// Requiere dependencias
const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2/promise");
const multer = require("multer");
const fs = require("fs");

// Inicializa Express
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Archivos públicos
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/libros", express.static(path.join(__dirname, "public/libros")));

// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "archivo") cb(null, "public/libros");
    else if (file.fieldname === "imagen") cb(null, "public/images");
    else cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "archivo") {
      file.mimetype === "application/pdf"
        ? cb(null, true)
        : cb(new Error("Solo se permiten PDF"));
    } else if (file.fieldname === "imagen") {
      ["image/jpeg", "image/png", "image/gif"].includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error("Solo se permiten imágenes JPEG, PNG o GIF"));
    } else {
      cb(null, true);
    }
  },
});

let db;

async function main() {
  try {
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "javiernoe123",
      database: "biblioteca",
    });
    console.log("✅ Conectado a MySQL");

    await crearTablas();
    configurarRutas();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1);
  }
}

async function crearTablas() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS libros (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      autor VARCHAR(255) NOT NULL,
      descripcion TEXT,
      imagen VARCHAR(255),
      archivo VARCHAR(255),
      contenido TEXT,
      trama VARCHAR(50)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contenidos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      libro_id INT NOT NULL,
      capitulo VARCHAR(50),
      titulo VARCHAR(255) NOT NULL,
      pagina INT NOT NULL,
      FOREIGN KEY (libro_id) REFERENCES libros(id) ON DELETE CASCADE
    )
  `);
}

function configurarRutas() {
  app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
  });

  app.get("/api/libros", async (req, res) => {
    const { trama } = req.query;
    const [rows] = await db.execute(
      trama ? "SELECT * FROM libros WHERE trama = ?" : "SELECT * FROM libros",
      trama ? [trama] : []
    );
    res.json(rows);
  });

  app.get("/api/libro/:id", async (req, res) => {
    const libroId = parseInt(req.params.id);
    const [libros] = await db.execute("SELECT * FROM libros WHERE id = ?", [libroId]);
    if (!libros.length) return res.status(404).json({ error: "Libro no encontrado" });

    const [contenidos] = await db.execute(
      "SELECT capitulo, titulo, pagina FROM contenidos WHERE libro_id = ? ORDER BY pagina",
      [libroId]
    );

    res.json({ ...libros[0], contenidos });
  });

  app.post("/api/libros", upload.fields([{ name: "archivo" }, { name: "imagen" }]), async (req, res) => {
    const { titulo, autor, descripcion, trama, contenido } = req.body;
    const archivo = req.files["archivo"]?.[0]?.filename || "";
    const imagen = req.files["imagen"]?.[0]?.filename || "";

    if (!titulo || !autor || !trama) return res.status(400).json({ error: "Campos obligatorios faltantes" });

    const [result] = await db.execute(
      `INSERT INTO libros (titulo, autor, descripcion, imagen, archivo, contenido, trama)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, autor, descripcion || "", imagen, archivo, contenido || "", trama]
    );

    res.status(201).json({ message: "Libro agregado", id: result.insertId });
  });

  app.put("/api/libros/:id", upload.fields([{ name: "archivo" }, { name: "imagen" }]), async (req, res) => {
    const libroId = parseInt(req.params.id);
    const { titulo, autor, descripcion, trama, contenido } = req.body;

    if (!titulo || !autor || !trama) return res.status(400).json({ error: "Campos obligatorios faltantes" });

    const archivo = req.files["archivo"]?.[0]?.filename || null;
    const imagen = req.files["imagen"]?.[0]?.filename || null;

    const [libros] = await db.execute("SELECT * FROM libros WHERE id = ?", [libroId]);
    if (!libros.length) return res.status(404).json({ error: "Libro no encontrado" });

    const libroActual = libros[0];

    if (archivo && libroActual.archivo) {
      const ruta = path.join(__dirname, "public/libros", libroActual.archivo);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
    }
    if (imagen && libroActual.imagen) {
      const ruta = path.join(__dirname, "public/images", libroActual.imagen);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
    }

    let query = `UPDATE libros SET titulo = ?, autor = ?, descripcion = ?, trama = ?, contenido = ?`;
    const params = [titulo, autor, descripcion || "", trama, contenido || ""];

    if (archivo) {
      query += ", archivo = ?";
      params.push(archivo);
    }
    if (imagen) {
      query += ", imagen = ?";
      params.push(imagen);
    }

    query += " WHERE id = ?";
    params.push(libroId);

    await db.execute(query, params);

    res.json({ message: "Libro actualizado" });
  });

  app.delete("/api/libros/:id", async (req, res) => {
    const libroId = parseInt(req.params.id);
    await db.execute("DELETE FROM contenidos WHERE libro_id = ?", [libroId]);
    const [result] = await db.execute("DELETE FROM libros WHERE id = ?", [libroId]);

    result.affectedRows === 0
      ? res.status(404).json({ error: "Libro no encontrado" })
      : res.json({ message: "Libro eliminado" });
  });
}

// Inicia servidor
main();


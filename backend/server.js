const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use("/images", express.static(__dirname + "/images"));
app.use("/libros", express.static(__dirname + "/libros"));

const libros = [
  {
    id: 1,
    titulo: "El-Quijote",
    autor: "Miguel de Cervantes",
    descripcion:
      "Una novela clásica de la literatura española que narra las aventuras de Don Quijote y su fiel escudero Sancho Panza.",
    imagen: "http://localhost:3000/images/El-Quijote.png",
    archivo: "http://localhost:3000/libros/El-Quijote.pdf",
  },
  {
    id: 2,
    titulo: "Cien-Años-de-Soledad",
    autor: "Gabriel García Márquez",
    descripcion:
      "Relato mágico y realista de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
    imagen: "http://localhost:3000/images/Cien-Años-de-Soledad.jpg",
    archivo: "http://localhost:3000/libros/Cien-Años-de-Soledad.pdf",
  },
  {
    id: 3,
    titulo: "Orgullo-y-prejuicio",
    autor: "Jane Austen",
    descripcion:
      "Historia romántica que explora las costumbres y matrimonios en la Inglaterra del siglo XIX.",
    imagen: "http://localhost:3000/images/Orgullo-y-prejuicio.jpg",
    archivo: "http://localhost:3000/libros/Orgullo-y-prejuicio.pdf",
  },
  {
    id: 4,
    titulo: "Crimen-y-castigo",
    autor: "Fiódor Dostoyevski",
    descripcion:
      "Novela psicológica sobre la culpa y la redención de un joven estudiante que comete un asesinato.",
    imagen: "http://localhost:3000/images/Crimen-y-castigo.jpg",
    archivo: "http://localhost:3000/libros/Crimen-y-castigo.pdf",
  },
];

app.get("/api/libros", (req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

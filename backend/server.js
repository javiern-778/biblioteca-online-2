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
  {
    id: 5,
    titulo: 'El-Gran-Gatsby',
    autor: 'F. Scott Fitzgerald',
    descripcion: 'Una historia de amor, ambición y tragedia ambientada en los locos años 20.',
    imagen: 'http://localhost:3000/images/El-Gran-Gatsby.jpg',
    archivo: 'http://localhost:3000/libros/El-Gran-Gatsby.pdf'
  },
  {
    id: 6,
    titulo: 'La-Odisea',
    autor: 'Homero',
    descripcion: 'Una épica aventura que sigue a Odiseo en su viaje de regreso a Ítaca tras la guerra de Troya.',
    imagen: 'http://localhost:3000/images/La-Odisea.jpg',
    archivo: 'http://localhost:3000/libros/La-Odisea.pdf'
  },
  {
    id: 7,
    titulo: 'Matar-a-un-ruiseñor',
    autor: 'Harper Lee',
    descripcion: 'Una poderosa novela sobre racismo e injusticia en el sur de Estados Unidos.',
    imagen: 'http://localhost:3000/images/Matar-a-un-ruiseñor.jpg',
    archivo: 'http://localhost:3000/libros/Matar-a-un-ruiseñor.pdf'
  },
  {
    id: 8,
    titulo: '1984',
    autor: 'George Orwell',
    descripcion: 'Un clásico de la literatura distópica que critica la vigilancia y el totalitarismo.',
    imagen: 'http://localhost:3000/images/1984.jpg',
    archivo: 'http://localhost:3000/libros/1984.pdf'
  },
  {
    id: 9,
    titulo: 'El-amor-en-los-tiempos-del-colera',
    autor: 'Gabriel García Márquez',
    descripcion: 'Una historia de amor que desafía el paso del tiempo y las barreras sociales.',
    imagen: 'http://localhost:3000/images/El-amor-en-los-tiempos-del-colera.jpg',
    archivo: 'http://localhost:3000/libros/El-amor-en-los-tiempos-del-colera.pdf'
  },
  {
    id: 10,
    titulo: 'Fahrenheit-451',
    autor: 'Ray Bradbury',
    descripcion: 'Una novela que imagina un futuro donde los libros están prohibidos y son quemados.',
    imagen: 'http://localhost:3000/images/Fahrenheit-451.jpg',
    archivo: 'http://localhost:3000/libros/Fahrenheit-451.pdf'
  }
];

app.get("/api/libros", (req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

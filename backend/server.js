const express = require('express');
const path = require('path');
const cors = require('cors'); // Opcional si usas CORS
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Opcional si usas CORS

// Archivos estáticos (ahora sí funcionará)
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/libros', express.static(path.join(__dirname, 'public', 'libros')));

// ... (el resto de tu código)


// Base de datos de libros
const libros = [
  // Aventura
  {
    id: 1,
    titulo: "La isla del tesoro",
    autor: "Robert Louis Stevenson",
    descripcion: "Clásica novela de aventuras sobre la búsqueda de un tesoro pirata.",
    imagen: "http://localhost:3000/images/isla-tescro.png", // Cambiado a isla-tescro.png
    archivo: "http://localhost:3000/libros/isla-tesoro.pdf",
    trama: "Aventura"
  },
  {
    id: 2,
    titulo: "Viaje al centro de la Tierra",
    autor: "Julio Verne",
    descripcion: "Aventura científica sobre una expedición al interior de nuestro planeta.",
    imagen: "http://localhost:3000/images/viaje-centro-tierra.png",
    archivo: "http://localhost:3000/libros/viaje-centro-tierra.pdf",
    trama: "Aventura",
  },
  {
    id: 3,
    titulo: "Robinson Crusoe",
    autor: "Daniel Defoe",
    descripcion: "Historia de supervivencia de un náufrago en una isla desierta.",
    imagen: "http://localhost:3000/images/robinson-cruxe.jpg", // Cambiado a robinson-cruxe.jpg
    archivo: "http://localhost:3000/libros/robinson-crusoe.pdf",
    trama: "Aventura",
  },
  {
    id: 4,
    titulo: "Los viajes de Gulliver",
    autor: "Jonathan Swift",
    descripcion: "Sátira social disfrazada de relato de viajes fantásticos.",
    imagen: "http://localhost:3000/images/viajes-guilliver.jpg", // Cambiado a viajes-guilliver.jpg
    archivo: "http://localhost:3000/libros/viajes-gulliver.pdf",
    trama: "Aventura",
  },
  {
    id: 5,
    titulo: "El conde de Montecristo",
    autor: "Alexandre Dumas",
    descripcion: "Historia de venganza y redención en la Francia del siglo XIX.",
    imagen: "http://localhost:3000/images/montecristo.jpg",
    archivo: "http://localhost:3000/libros/montecristo.pdf",
    trama: "Aventura",
  },

  // Romántica
  {
    id: 6,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    descripcion: "Clásica historia de amor entre Elizabeth Bennet y Mr. Darcy.",
    imagen: "http://localhost:3000/images/orgullo-prejuicio.jpg",
    archivo: "http://localhost:3000/libros/orgullo-prejuicio.pdf",
    trama: "Romántica",
  },
  {
    id: 7,
    titulo: "Cumbres borrascosas",
    autor: "Emily Brontë",
    descripcion: "Intensa historia de amor y venganza en los páramos de Yorkshire.",
    imagen: "http://localhost:3000/images/cumbrez-borracosas.jpg", // Cambiado a cumbrez-borracosas.jpg
    archivo: "http://localhost:3000/libros/cumbres-borrascosas.pdf",
    trama: "Romántica",
  },
  {
    id: 8,
    titulo: "El amor en los tiempos del cólera",
    autor: "Gabriel García Márquez",
    descripcion: "Historia de amor que perdura a través de los años.",
    imagen: "http://localhost:3000/images/amor-tempo-s-colera.png", // Cambiado a amor-tempo-s-colera.png
    archivo: "http://localhost:3000/libros/amor-tiempos-colera.pdf",
    trama: "Romántica",
  },
  {
    id: 9,
    titulo: "Jane Eyre",
    autor: "Charlotte Brontë",
    descripcion: "Novela gótica sobre una institutriz y su amor por el misterioso Mr. Rochester.",
    imagen: "http://localhost:3000/images/jane-eyte.jpg", // Cambiado a jane-eyte.jpg
    archivo: "http://localhost:3000/libros/jane-eyre.pdf",
    trama: "Romántica",
  },
  {
    id: 10,
    titulo: "Bajo la misma estrella",
    autor: "John Green",
    descripcion: "Conmovedora historia de amor entre dos adolescentes con cáncer.",
    imagen: "http://localhost:3000/images/bajo-minna-eitrella.jpg", // Cambiado a bajo-minna-eitrella.jpg
    archivo: "http://localhost:3000/libros/bajo-misma-estrella.pdf",
    trama: "Romántica",
  },

  // Suspenso
  {
    id: 11,
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    descripcion: "Thriller que mezcla arte, religión y secretos históricos.",
    imagen: "http://localhost:3000/images/codigo-da-vinci.jpg",
    archivo: "http://localhost:3000/libros/codigo-da-vinci.pdf",
    trama: "Suspenso",
  },
  {
    id: 12,
    titulo: "La chica del tren",
    autor: "Paula Hawkins",
    descripcion: "Thriller psicológico sobre un crimen visto desde un tren.",
    imagen: "http://localhost:3000/images/chica-dei-tre-n.jpg", // Cambiado a chica-dei-tre-n.jpg
    archivo: "http://localhost:3000/libros/chica-del-tren.pdf",
    trama: "Suspenso",
  },
  {
    id: 13,
    titulo: "Gone Girl",
    autor: "Gillian Flynn",
    descripcion: "Intriga psicológica sobre una desaparición misteriosa.",
    imagen: "http://localhost:3000/images/gone-grill.jpg", // Cambiado a gone-grill.jpg
    archivo: "http://localhost:3000/libros/gone-girl.pdf",
    trama: "Suspenso",
  },
  {
    id: 14,
    titulo: "Los hombres que no amaban a las mujeres",
    autor: "Stieg Larsson",
    descripcion: "Primer libro de la trilogía Millennium sobre un periodista y una hacker.",
    imagen: "http://localhost:3000/images/millennium.jpg",
    archivo: "http://localhost:3000/libros/millennium.pdf",
    trama: "Suspenso",
  },
  {
    id: 15,
    titulo: "El silencio de los corderos",
    autor: "Thomas Harris",
    descripcion: "Thriller sobre un asesino en serie y un agente del FBI.",
    imagen: "http://localhost:3000/images/silencio-cordero.jpg", // Cambiado a silencio-cordero.jpg
    archivo: "http://localhost:3000/libros/silencio-corderos.pdf",
    trama: "Suspenso",
  },

  // Terror
  {
    id: 16,
    titulo: "Drácula",
    autor: "Bram Stoker",
    descripcion: "La novela que definió el mito del vampiro moderno.",
    imagen: "http://localhost:3000/images/dracula.jpg",
    archivo: "http://localhost:3000/libros/dracula.pdf",
    trama: "Terror",
  },
  {
    id: 17,
    titulo: "It",
    autor: "Stephen King",
    descripcion: "Historia de un grupo de niños que enfrentan a una entidad malévola.",
    imagen: "http://localhost:3000/images/h.png", // Cambiado a h.png
    archivo: "http://localhost:3000/libros/it.pdf",
    trama: "Terror",
  },
  {
    id: 18,
    titulo: "Frankenstein",
    autor: "Mary Shelley",
    descripcion: "Clásico sobre un científico que crea vida artificial con consecuencias trágicas.",
    imagen: "http://localhost:3000/images/frankenstein.jpg",
    archivo: "http://localhost:3000/libros/frankenstein.pdf",
    trama: "Terror",
  },
  {
    id: 19,
    titulo: "El exorcista",
    autor: "William Peter Blatty",
    descripcion: "Aterradora historia de una posesión demoníaca.",
    imagen: "http://localhost:3000/images/exorcista.jpg",
    archivo: "http://localhost:3000/libros/exorcista.pdf",
    trama: "Terror",
  },
  {
    id: 20,
    titulo: "El resplandor",
    autor: "Stephen King",
    descripcion: "Un escritor y su familia cuidan un hotel aislado con presencia sobrenatural.",
    imagen: "http://localhost:3000/images/resplandoi.jpg", // Cambiado a resplandoi.jpg
    archivo: "http://localhost:3000/libros/resplandor.pdf",
    trama: "Terror",
  },

  // Ciencia Ficción
  {
    id: 21,
    titulo: "1984",
    autor: "George Orwell",
    descripcion: "Distopía sobre un estado totalitario que controla todos los aspectos de la vida.",
    imagen: "http://localhost:3000/images/1984.jpg",
    archivo: "http://localhost:3000/libros/1984.pdf",
    trama: "Ciencia Ficción",
  },
  {
    id: 22,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    descripcion: "Futuro donde los libros están prohibidos y los bomberos los queman.",
    imagen: "http://localhost:3000/images/faltenheit-45-l.jpg", // Cambiado a faltenheit-45-l.jpg
    archivo: "http://localhost:3000/libros/fahrenheit-451.pdf",
    trama: "Ciencia Ficción",
  },
  {
    id: 23,
    titulo: "Dune",
    autor: "Frank Herbert",
    descripcion: "Épica de ciencia ficción ambientada en un desértico planeta.",
    imagen: "http://localhost:3000/images/dune.jpg",
    archivo: "http://localhost:3000/libros/dune.pdf",
    trama: "Ciencia Ficción",
  },
  {
    id: 24,
    titulo: "Un mundo feliz",
    autor: "Aldous Huxley",
    descripcion: "Visión futurista de una sociedad controlada por el placer y la tecnología.",
    imagen: "http://localhost:3000/images/mundo-feliz.jpg",
    archivo: "http://localhost:3000/libros/mundo-feliz.pdf",
    trama: "Ciencia Ficción",
  },
  {
    id: 25,
    titulo: "El juego de Ender",
    autor: "Orson Scott Card",
    descripcion: "Historia de un niño genio entrenado para defender a la Tierra.",
    imagen: "http://localhost:3000/images/juego-ende.jpg", // Cambiado a juego-ende.jpg
    archivo: "http://localhost:3000/libros/juego-ender.pdf",
    trama: "Ciencia Ficción",
  },

  // Fantasía
  {
    id: 26,
    titulo: "El señor de los anillos",
    autor: "J.R.R. Tolkien",
    descripcion: "Épica fantasía sobre la búsqueda para destruir un anillo maligno.",
    imagen: "http://localhost:3000/images/senor-anillos.png",
    archivo: "http://localhost:3000/libros/senor-anillos.pdf",
    trama: "Fantasía",
  },
  {
    id: 27,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    descripcion: "Primer libro de la saga sobre un joven mago y sus amigos.",
    imagen: "http://localhost:3000/images/harry-potter.jpg",
    archivo: "http://localhost:3000/libros/harry-potter.pdf",
    trama: "Fantasía",
  },
  {
    id: 28,
    titulo: "Canción de hielo y fuego (Juego de tronos)",
    autor: "George R.R. Martin",
    descripcion: "Primer libro de la saga de fantasía épica que inspiró la serie Game of Thrones.",
    imagen: "http://localhost:3000/images/juego-tronos.png",
    archivo: "http://localhost:3000/libros/juego-tronos.pdf",
    trama: "Fantasía",
  },
  {
    id: 29,
    titulo: "Las crónicas de Narnia",
    autor: "C.S. Lewis",
    descripcion: "Serie de fantasía sobre un mundo mágico accesible a través de un armario.",
    imagen: "http://localhost:3000/images/narrisi.jpg", // Cambiado a narrisi.jpg
    archivo: "http://localhost:3000/libros/narnia.pdf",
    trama: "Fantasía",
  },
  {
    id: 30,
    titulo: "El hobbit",
    autor: "J.R.R. Tolkien",
    descripcion: "Aventura de un hobbit que se une a una búsqueda para recuperar un tesoro.",
    imagen: "http://localhost:3000/images/habbit.jpg", // Cambiado a habbit.jpg
    archivo: "http://localhost:3000/libros/hobbit.pdf",
    trama: "Fantasía",
  },

  // Histórica
  {
    id: 31,
    titulo: "Los pilares de la Tierra",
    autor: "Ken Follett",
    descripcion: "Novela histórica sobre la construcción de una catedral en la Edad Media.",
    imagen: "http://localhost:3000/images/pilare-tierra.jpg", // Cambiado a pilare-tierra.jpg
    archivo: "http://localhost:3000/libros/pilares-tierra.pdf",
    trama: "Histórica",
  },
  {
    id: 32,
    titulo: "El nombre de la rosa",
    autor: "Umberto Eco",
    descripcion: "Misterio histórico ambientado en un monasterio medieval.",
    imagen: "http://localhost:3000/images/nombre-rosa.jpg",
    archivo: "http://localhost:3000/libros/nombre-rosa.pdf",
    trama: "Histórica",
  },
  {
    id: 33,
    titulo: "Guerra y paz",
    autor: "León Tolstói",
    descripcion: "Obra maestra sobre la sociedad rusa durante las guerras napoleónicas.",
    imagen: "http://localhost:3000/images/guerra-paz.jpg",
    archivo: "http://localhost:3000/libros/guerra-paz.pdf",
    trama: "Histórica",
  },
  {
    id: 34,
    titulo: "El último judío",
    autor: "Noah Gordon",
    descripcion: "Historia de un médico judío en la España del siglo XV.",
    imagen: "http://localhost:3000/images/ultimo-judio.jpg",
    archivo: "http://localhost:3000/libros/ultimo-judio.pdf",
    trama: "Histórica",
  },
  {
    id: 35,
    titulo: "Sinuhé, el egipcio",
    autor: "Mika Waltari",
    descripcion: "Novela histórica sobre un médico en el antiguo Egipto.",
    imagen: "http://localhost:3000/images/simile.jpg", // Cambiado a simile.jpg
    archivo: "http://localhost:3000/libros/sinuhe.pdf",
    trama: "Histórica",
  },

  // Drama
  {
    id: 36,
    titulo: "Crimen y castigo",
    autor: "Fiódor Dostoievski",
    descripcion: "Drama psicológico sobre un estudiante que comete un crimen.",
    imagen: "http://localhost:3000/images/crimen-casi-go.png", // Cambiado a crimen-casi-go.png
    archivo: "http://localhost:3000/libros/crimen-castigo.pdf",
    trama: "Drama",
  },
  {
    id: 37,
    titulo: "La casa de los espíritus",
    autor: "Isabel Allende",
    descripcion: "Drama familiar que abarca varias generaciones en Latinoamérica.",
    imagen: "http://localhost:3000/images/casa-espiritus-jpg", // Cambiado a casa-espiritus-jpg
    archivo: "http://localhost:3000/libros/casa-espiritus.pdf",
    trama: "Drama",
  },
  {
    id: 38,
    titulo: "Matar a un ruiseñor",
    autor: "Harper Lee",
    descripcion: "Drama sobre racismo e injusticia en el sur de Estados Unidos.",
    imagen: "http://localhost:3000/images/matar-ruisenot.jpg", // Cambiado a matar-ruisenot.jpg
    archivo: "http://localhost:3000/libros/matar-ruisenor.pdf",
    trama: "Drama",
  },
  {
    id: 39,
    titulo: "Las uvas de la ira",
    autor: "John Steinbeck",
    descripcion: "Drama sobre una familia de agricultores durante la Gran Depresión.",
    imagen: "http://localhost:3000/images/uvas-tra.jpg", // Cambiado a uvas-tra.jpg
    archivo: "http://localhost:3000/libros/uvas-ira.pdf",
    trama: "Drama",
  },
  {
    id: 40,
    titulo: "Anna Karénina",
    autor: "León Tolstói",
    descripcion: "Tragedia sobre el adulterio y la sociedad rusa del siglo XIX.",
    imagen: "http://localhost:3000/images/ama-karenin-a.jpg", // Cambiado a ama-karenin-a.jpg
    archivo: "http://localhost:3000/libros/anna-karenina.pdf",
    trama: "Drama",
  },

  // Biográfica
  {
    id: 41,
    titulo: "Steve Jobs",
    autor: "Walter Isaacson",
    descripcion: "Biografía autorizada del cofundador de Apple.",
    imagen: "http://localhost:3000/images/steve-jobs.png",
    archivo: "http://localhost:3000/libros/steve-jobs.pdf",
    trama: "Biográfica",
  },
  {
    id: 42,
    titulo: "El diario de Ana Frank",
    autor: "Ana Frank",
    descripcion: "Diario personal de una niña judía escondida durante el Holocausto.",
    imagen: "http://localhost:3000/images/ana-frank.jpg",
    archivo: "http://localhost:3000/libros/ana-frank.pdf",
    trama: "Biográfica",
  },
  {
    id: 43,
    titulo: "Einstein: su vida y su universo",
    autor: "Walter Isaacson",
    descripcion: "Biografía completa del famoso físico.",
    imagen: "http://localhost:3000/images/einstein.jpg",
    archivo: "http://localhost:3000/libros/einstein.pdf",
    trama: "Biográfica",
  },
  {
    id: 44,
    titulo: "Mi lucha (Mein Kampf)",
    autor: "Adolf Hitler",
    descripcion: "Autobiografía y manifiesto político del líder nazi. [Contenido controvertido]",
    imagen: "http://localhost:3000/images/mein-kampf.jpg",
    archivo: "http://localhost:3000/libros/mein-kampf.pdf",
    trama: "Biográfica",
  },
  {
    id: 45,
    titulo: "Agatha Christie: Una autobiografía",
    autor: "Agatha Christie",
    descripcion: "La vida de la famosa escritora de novelas de misterio.",
    imagen: "http://localhost:3000/images/agatha-christ-fe.jpg", // Cambiado a agatha-christ-fe.jpg
    archivo: "http://localhost:3000/libros/agatha-christie.pdf",
    trama: "Biográfica",
  },

  // Coming of Age
  {
    id: 46,
    titulo: "El guardián entre el centeno",
    autor: "J.D. Salinger",
    descripcion: "Novela sobre la alienación y la transición a la vida adulta.",
    imagen: "http://localhost:3000/images/guardian-centeno.jpg",
    archivo: "http://localhost:3000/libros/guardian-centeno.pdf",
    trama: "Coming of Age",
  },
  {
    id: 47,
    titulo: "Las ventajas de ser invisible",
    autor: "Stephen Chbosky",
    descripcion: "Historia epistolar sobre un adolescente que navega por la vida.",
    imagen: "http://localhost:3000/images/ventajas-invisible.jpg", // Cambiado a ventajas-invisible.jpg
    archivo: "http://localhost:3000/libros/ventajas-invisible.pdf",
    trama: "Coming of Age",
  },
  {
    id: 48,
    titulo: "Matar a un ruiseñor",
    autor: "Harper Lee",
    descripcion: "Drama sobre racismo e injusticia en el sur de Estados Unidos.",
    imagen: "http://localhost:3000/images/matar-ruisenor2.jpg",
    archivo: "http://localhost:3000/libros/matar-ruisenor.pdf",
    trama: "Coming of Age",
  },
  {
    id: 49,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    descripcion: "Fábula filosófica sobre un niño que viaja por diferentes planetas.",
    imagen: "http://localhost:3000/images/principito.jpg",
    archivo: "http://localhost:3000/libros/principito.pdf",
    trama: "Coming of Age",
  },
  {
    id: 50,
    titulo: "Persépolis",
    autor: "Marjane Satrapi",
    descripcion: "Novela gráfica autobiográfica sobre crecer durante la Revolución Iraní.",
    imagen: "http://localhost:3000/images/petsepolis.jpg", // Cambiado a petsepolis.jpg
    archivo: "http://localhost:3000/libros/persepolis.pdf",
    trama: "Coming of Age",
  },

  // Comedia
  {
    id: 51,
    titulo: "El ingenioso hidalgo Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    descripcion: "Novela satírica sobre un caballero enloquecido por leer demasiados libros de caballerías.",
    imagen: "http://localhost:3000/images/quijote.jpg",
    archivo: "http://localhost:3000/libros/quijote.pdf",
    trama: "Comedia",
  },
  {
    id: 52,
    titulo: "Bridget Jones's Diary",
    autor: "Helen Fielding",
    descripcion: "Diario cómico de una mujer soltera en Londres.",
    imagen: "http://localhost:3000/images/bridge-lymes-jpg", // Cambiado a bridge-lymes-jpg
    archivo: "http://localhost:3000/libros/bridget-jones.pdf",
    trama: "Comedia",
  },
  {
    id: 53,
    titulo: "Tres hombres en un bote",
    autor: "Jerome K. Jerome",
    descripcion: "Humorística crónica de un viaje en bote por el Támesis.",
    imagen: "http://localhost:3000/images/tree-hombres-bote.jpg", // Cambiado a tree-hombres-bote.jpg
    archivo: "http://localhost:3000/libros/tres-hombres-bote.pdf",
    trama: "Comedia",
  },
  {
    id: 54,
    titulo: "Good Omens",
    autor: "Terry Pratchett & Neil Gaiman",
    descripcion: "Comedia sobre un ángel y un demonio que intentan evitar el Apocalipsis.",
    imagen: "http://localhost:3000/images/good-omens.jpg",
    archivo: "http://localhost:3000/libros/good-omens.pdf",
    trama: "Comedia",
  },
  {
    id: 55,
    titulo: "El diario de Greg",
    autor: "Jeff Kinney",
    descripcion: "Novela gráfica humorística sobre las desventuras de un preadolescente.",
    imagen: "http://localhost:3000/images/diario-greg.jpg",
    archivo: "http://localhost:3000/libros/diario-greg.pdf",
    trama: "Comedia",
  }
];

// Rutas de la API
app.get("/api/libros", (req, res) => {
  res.json(libros);
});

app.get("/api/libros/:trama", (req, res) => {
  const trama = req.params.trama;
  const librosFiltrados = libros.filter((libro) => libro.trama === trama);
  res.json(librosFiltrados);
});

// Iniciar servidor (SOLO UNA VEZ)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API de libros: http://localhost:${PORT}/api/libros`);
});
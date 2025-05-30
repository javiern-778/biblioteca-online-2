const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use('/images', express.static(__dirname + '/images'))
app.use('/libros', express.static(__dirname + '/libros'))

const libros = [
  {
    id: 1,
    titulo: 'El Quijote',
    autor: 'Miguel de Cervantes',
    imagen: 'http://localhost:3000/images/portada1.jpg',
    archivo: 'http://localhost:3000/libros/libro1.pdf'
  },
  {
    id: 2,
    titulo: 'Cien Años de Soledad',
    autor: 'Gabriel García Márquez',
    imagen: 'http://localhost:3000/images/portada2.jpg',
    archivo: 'http://localhost:3000/libros/libro2.pdf'
  }
]

app.get('/api/libros', (req, res) => {
  res.json(libros)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

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
    imagen: 'http://localhost:3000/images/El Quijote.png',
    archivo: 'http://localhost:3000/libros/El Quijote.pdf'
  },
  {
    id: 2,
    titulo: 'Cien Años de Soledad',
    autor: 'Gabriel García Márquez',
    imagen: 'http://localhost:3000/images/Cien Años de Soledad.jpg',
    archivo: 'http://localhost:3000/libros/Cien Años de Soledad.pdf'
  }
]

app.get('/api/libros', (req, res) => {
  res.json(libros)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

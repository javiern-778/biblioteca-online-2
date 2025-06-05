<template>
  <div v-if="libro" class="detalle-container">
    <h1>{{ libro.titulo }}</h1>

    <img
      v-if="libro.imagen"
      :src="`http://localhost:3000/images/${libro.imagen}`"
      :alt="libro.titulo"
      class="portada"
    />

    <p><strong>Autor:</strong> {{ libro.autor }}</p>
    <p v-if="libro.edicion"><strong>Edición:</strong> {{ libro.edicion }}</p>
    <p><strong>Trama:</strong> {{ libro.trama }}</p>
    <p><strong>Descripción:</strong> {{ libro.descripcion }}</p>

    <h2>Contenido:</h2>
    <div v-if="libro.contenidos && libro.contenidos.length">
      <ul>
        <li v-for="(item, index) in libro.contenidos" :key="index">
          {{ item.capitulo ? item.capitulo + '.' : '' }} {{ item.titulo }}
        </li>
      </ul>
    </div>
    <p v-else>No hay información de contenido disponible para este libro</p>

    <div class="botones" v-if="libro.archivo">
      <a
        :href="`http://localhost:3000/libros/${libro.archivo}`"
        class="btn btn-descargar"
        download
      >
        Descargar PDF
      </a>

      <a
        :href="`http://localhost:3000/libros/${libro.archivo}`"
        class="btn btn-ver"
        target="_blank"
        rel="noopener"
      >
        Ver en línea
      </a>
    </div>
  </div>

  <div v-else class="detalle-container">
    <p>Libro no encontrado.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const libro = ref(null)

onMounted(async () => {
  try {
    const id = route.params.id
    const res = await axios.get(`http://localhost:3000/api/libro/${id}`)
    libro.value = res.data
  } catch (err) {
    console.error('Error cargando libro:', err)
  }
})
</script>

<style scoped>
.detalle-container {
  max-width: 700px;
  margin: auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.portada {
  width: 200px;
  display: block;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.botones {
  margin-top: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  color: white;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.btn-descargar {
  background-color: #38a169;
}

.btn-descargar:hover {
  background-color: #2f855a;
}

.btn-ver {
  background-color: #3182ce;
}

.btn-ver:hover {
  background-color: #2b6cb0;
}
</style>

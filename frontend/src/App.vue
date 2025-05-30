<template>
  <div>
    <h1 class="titulo-principal">Biblioteca Online</h1>
    <div class="libros-grid">
      <LibroCard 
        v-for="libro in libros" 
        :key="libro.id" 
        :libro="libro" 
        @seleccionar="abrirModal" />
    </div>

    <ModalLibro 
      v-if="libroSeleccionado" 
      :archivo="libroSeleccionado.archivo" 
      @cerrar="cerrarModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LibroCard from './components/LibroCard.vue'
import ModalLibro from './components/ModalLibro.vue'

const libros = ref([])
const libroSeleccionado = ref(null)

async function cargarLibros() {
  const res = await fetch('http://localhost:3000/api/libros')
  libros.value = await res.json()
}

function abrirModal(libro) {
  libroSeleccionado.value = libro
}

function cerrarModal() {
  libroSeleccionado.value = null
}

onMounted(() => {
  cargarLibros()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

.titulo-principal {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  margin: 2rem 0 1rem;
  font-weight: 700;
  color: #2c3e50;
  font-size: 2.4rem;
}

.libros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(280px,1fr));
  gap: 1.5rem;
  padding: 0 1rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

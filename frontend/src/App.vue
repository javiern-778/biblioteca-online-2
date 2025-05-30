<template>
  <div class="container">
    <h1>Biblioteca en Línea</h1>
    <div class="libros">
      <LibroCard
        v-for="libro in libros"
        :key="libro.id"
        :libro="libro"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LibroCard from './components/LibroCard.vue'

const libros = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/libros')
  libros.value = await res.json()
})
</script>

<style>
.container {
  padding: 2rem;
}
.libros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>

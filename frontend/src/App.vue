<template>
  <div class="app-container">
    <header>
      <h1>📚 Biblioteca en Línea</h1>
      <p>Encuentra y descarga tus libros favoritos</p>
    </header>

    <main>
      <div class="libros-grid">
        <LibroCard
          v-for="libro in libros"
          :key="libro.id"
          :libro="libro"
        />
      </div>
    </main>

    <footer>
      <small>© 2025 Biblioteca en Línea - Todos los derechos reservados</small>
    </footer>
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

<style scoped>
.app-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.3rem;
  color: #2c3e50;
}

header p {
  font-size: 1.2rem;
  color: #555;
}

.libros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

footer {
  margin-top: 3rem;
  text-align: center;
  color: #888;
  font-size: 0.9rem;
}
</style>

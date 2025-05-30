<template>
  <div class="card" @click="abrirLibro" role="button" tabindex="0" @keydown.enter="abrirLibro">
    <img :src="libro.imagen" :alt="libro.titulo" />
    <div class="info">
      <h2>{{ libro.titulo }}</h2>
      <p class="autor">{{ libro.autor }}</p>
      <a :href="libro.archivo" download class="btn-download" @click.stop>📥 Descargar</a>
    </div>
  </div>
</template>

<script setup>
defineProps(['libro'])

function abrirLibro() {
  window.open(libro.archivo, '_blank')
}
</script>

<style scoped>
.card {
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  background: #fff;
  transition: transform 0.2s ease;
  outline: none;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgb(0 0 0 / 0.15);
}

.card:focus {
  box-shadow: 0 0 0 3px #2980b9;
}

img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
  color: #34495e;
}

.autor {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-style: italic;
}

.btn-download {
  text-align: center;
  background-color: #2980b9;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-download:hover {
  background-color: #3498db;
}
</style>

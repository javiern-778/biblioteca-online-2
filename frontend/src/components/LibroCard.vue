<template>
    <div class="card">
      <img :src="libro.imagen" :alt="libro.titulo" />
      <h2>{{ libro.titulo }}</h2>
      <p>{{ libro.autor }}</p>
      <a :href="libro.archivo" download>Descargar</a>
    </div>
  </template>
  
  <script setup>
  defineProps(['libro'])
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  img {
    width: 100%;
    height: auto;
  }
  </style>
  
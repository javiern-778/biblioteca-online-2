<template>
  <div class="libro-card" @click="$emit('seleccionar', libro)">
    <div class="libro-imagen-container">
      <img :src="libro.imagen" :alt="libro.titulo" class="libro-imagen" />
    </div>
    <div class="libro-info">
      <h3 class="libro-titulo">{{ libro.titulo }}</h3>
      <p class="libro-autor">{{ libro.autor }}</p>
      <p class="libro-descripcion">{{ truncateDescription(libro.descripcion) }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  libro: {
    type: Object,
    required: true
  }
});

const truncateDescription = (desc) => {
  return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
};
</script>

<style>
.libro-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.libro-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.libro-imagen-container {
  height: 200px;
  overflow: hidden;
}

.libro-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.libro-card:hover .libro-imagen {
  transform: scale(1.05);
}

.libro-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.libro-titulo {
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: #2c3e50;
}

.libro-autor {
  margin: 0 0 10px 0;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.libro-descripcion {
  margin: 0;
  font-size: 0.8rem;
  color: #34495e;
  flex-grow: 1;
}
</style>
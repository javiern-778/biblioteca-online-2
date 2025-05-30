<template>
  <div class="card" @click="seleccionarLibro" role="button" tabindex="0" @keydown.enter="seleccionarLibro">
    <img :src="libro.imagen" :alt="libro.titulo" />
    <div class="info">
      <h2>{{ libro.titulo }}</h2>
      <p class="autor">{{ libro.autor }}</p>
      <p class="descripcion">{{ libro.descripcion }}</p>
      <a :href="libro.archivo" download class="btn-download" @click.stop>📥 Descargar</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  libro: Object
})
const emit = defineEmits(['seleccionar'])

function seleccionarLibro() {
  emit('seleccionar', props.libro)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  outline: none;
}

.card:hover,
.card:focus {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-bottom: 3px solid #2980b9;
}

.info {
  padding: 1.2rem 1.5rem 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

h2 {
  font-size: 1.4rem;
  margin: 0 0 0.3rem;
  color: #2c3e50;
  font-weight: 600;
}

.autor {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.8rem;
  font-style: italic;
  letter-spacing: 0.03em;
}

.descripcion {
  font-size: 0.95rem;
  color: #555d66;
  margin-bottom: 1rem;
  flex-grow: 1;
  line-height: 1.4;
}

.btn-download {
  align-self: flex-start;
  background-color: #2980b9;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 24px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(41, 128, 185, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-download:hover {
  background-color: #3498db;
  box-shadow: 0 4px 14px rgba(52, 152, 219, 0.6);
}
</style>

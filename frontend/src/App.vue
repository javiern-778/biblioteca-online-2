<template>
  <div>
    <h1 class="titulo-principal">Biblioteca Online</h1>

    <!-- Menú de categorías estilo pestañas -->
    <div class="menu-categorias">
      <button 
        v-for="trama in tramas" 
        :key="trama"
        :class="{ 'active': tramaSeleccionada === trama }"
        @click="tramaSeleccionada = trama"
      >
        {{ trama }}
      </button>
      <button 
        :class="{ 'active': !tramaSeleccionada }"
        @click="tramaSeleccionada = ''"
      >
        Todos
      </button>
    </div>

    <div class="libros-grid">
      <LibroCard
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        @seleccionar="abrirModal"
      />
    </div>

    <ModalLibro
      v-if="libroSeleccionado"
      :archivo="libroSeleccionado.archivo"
      @cerrar="cerrarModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import LibroCard from "./components/LibroCard.vue";
import ModalLibro from "./components/ModalLibro.vue";

const libros = ref([]);
const libroSeleccionado = ref(null);
const tramaSeleccionada = ref("");
const isLoading = ref(true);
const error = ref(null);

const tramas = [
  "Aventura", "Romántica", "Suspenso", "Terror", 
  "Ciencia Ficción", "Fantasía", "Histórica", "Drama", 
  "Biográfica", "Coming of Age", "Comedia"
];

async function cargarLibros() {
  try {
    isLoading.value = true;
    const res = await fetch("http://localhost:3000/api/libros");
    
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    
    libros.value = await res.json();
    error.value = null;
  } catch (err) {
    error.value = "No se pudieron cargar los libros. Intente nuevamente más tarde.";
    console.error("Error al cargar libros:", err);
  } finally {
    isLoading.value = false;
  }
}

function abrirModal(libro) {
  libroSeleccionado.value = libro;
}

function cerrarModal() {
  libroSeleccionado.value = null;
}

const librosFiltrados = computed(() => {
  if (!tramaSeleccionada.value) return libros.value;
  return libros.value.filter((libro) => libro.trama === tramaSeleccionada.value);
});

onMounted(() => {
  cargarLibros();
});
</script>

<style>
.titulo-principal {
  text-align: center;
  margin-bottom: 20px;
}

.menu-categorias {
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.menu-categorias button {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #f0f0f0;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.menu-categorias button:hover {
  background-color: #e0e0e0;
}

.menu-categorias button.active {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
}

.libros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .menu-categorias {
    padding-left: 10px;
    padding-right: 10px;
  }
  
  .libros-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
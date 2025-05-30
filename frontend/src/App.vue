<template>
  <div class="biblioteca-container">
    <h1 class="titulo-principal">Biblioteca Online</h1>

    <!-- Menú de categorías -->
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

    <!-- Mensaje de carga/error -->
    <div v-if="isLoading" class="cargando">Cargando libros...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Grid de libros -->
    <div class="libros-grid">
      <LibroCard
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        @seleccionar="abrirModal"
      />
    </div>

    <!-- Modal -->
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

// Estado de la aplicación
const libros = ref([]);
const libroSeleccionado = ref(null);
const tramaSeleccionada = ref("");
const isLoading = ref(true);
const error = ref(null);

// Categorías
const tramas = [
  "Aventura", "Romántica", "Suspenso", "Terror",
  "Ciencia Ficción", "Fantasía", "Histórica", "Drama",
  "Biográfica", "Coming of Age", "Comedia"
];

// Cargar libros desde la API
async function cargarLibros() {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await fetch("http://localhost:3000/api/libros");
    
    if (!response.ok) {
      throw new Error(`Error al cargar libros: ${response.status}`);
    }
    
    libros.value = await response.json();
  } catch (err) {
    error.value = "No se pudieron cargar los libros. Intente nuevamente más tarde.";
    console.error("Error:", err);
  } finally {
    isLoading.value = false;
  }
}

// Funciones del modal
function abrirModal(libro) {
  libroSeleccionado.value = libro;
}

function cerrarModal() {
  libroSeleccionado.value = null;
}

// Computed: libros filtrados por categoría
const librosFiltrados = computed(() => {
  if (!tramaSeleccionada.value) return libros.value;
  return libros.value.filter(libro => libro.trama === tramaSeleccionada.value);
});

// Cargar libros al montar el componente
onMounted(() => {
  cargarLibros();
});
</script>

<style>
.biblioteca-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.titulo-principal {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.menu-categorias {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 15px 0;
  margin-bottom: 30px;
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
  background-color: #42b983;
  color: white;
  font-weight: bold;
}

.libros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
  padding: 20px 0;
}

.cargando, .error {
  text-align: center;
  padding: 20px;
  margin: 20px 0;
  border-radius: 5px;
}

.cargando {
  background-color: #f8f9fa;
  color: #6c757d;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
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
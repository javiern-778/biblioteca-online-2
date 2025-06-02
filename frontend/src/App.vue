<template>
  <div class="biblioteca">
    <h1 class="biblioteca__titulo">📚 Biblioteca Online</h1>

    <p class="biblioteca__descripcion">
      Explora una colección única de libros digitales con categorías como aventura, romance, suspenso, terror, ciencia ficción, fantasía, drama, biografías y más. Vive emociones intensas y viajes inolvidables desde cualquier lugar.
    </p>

    <!-- Buscador -->
    <input
      v-model="busqueda"
      type="text"
      placeholder="🔍 Buscar por título..."
      class="buscador"
    />

    <!-- Tabs de categorías -->
    <nav class="categorias">
      <button
        :class="['categorias__btn', { active: !tramaSeleccionada }]"
        @click="tramaSeleccionada = ''"
      >
        Todos
      </button>
      <button
        v-for="trama in tramasUnicas"
        :key="trama"
        :class="['categorias__btn', { active: tramaSeleccionada === trama }]"
        @click="tramaSeleccionada = trama"
      >
        {{ trama }}
      </button>
    </nav>

    <!-- Mensajes -->
    <p v-if="isLoading" class="mensaje mensaje--cargando">📦 Cargando libros...</p>
    <p v-else-if="error" class="mensaje mensaje--error">⚠️ {{ error }}</p>
    <p v-else-if="librosFiltrados.length === 0" class="mensaje mensaje--info">
      📭 No se encontraron libros con esos criterios.
    </p>

    <!-- Libros -->
    <section v-else class="libros">
      <LibroCard
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        @seleccionar="abrirModal"
      />
    </section>

    <!-- Modal -->
    <ModalLibro
      v-if="libroSeleccionado"
      :libro="libroSeleccionado"
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
const busqueda = ref("");
const isLoading = ref(true);
const error = ref(null);

// Categorías únicas
const tramasUnicas = computed(() => {
  const tramas = new Set(libros.value.map(libro => libro.trama));
  return Array.from(tramas).sort();
});

// Cargar libros desde la API
const cargarLibros = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const res = await fetch("http://localhost:3000/api/libros");
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    libros.value = await res.json();
  } catch (err) {
    console.error("Error al cargar libros:", err);
    error.value = "No se pudieron cargar los libros. Intente nuevamente más tarde.";
  } finally {
    isLoading.value = false;
  }
};

// Modal
const abrirModal = (libro) => {
  libroSeleccionado.value = libro;
};
const cerrarModal = () => {
  libroSeleccionado.value = null;
};

// Filtrado por categoría y título
const librosFiltrados = computed(() => {
  return libros.value.filter(libro => {
    const coincideTrama = !tramaSeleccionada.value || libro.trama === tramaSeleccionada.value;
    const coincideBusqueda = libro.titulo.toLowerCase().includes(busqueda.value.toLowerCase());
    return coincideTrama && coincideBusqueda;
  });
});

onMounted(() => {
  cargarLibros();
});
</script>

<style>
:root {
  --primario: #42b983;
  --gradiente: linear-gradient(to right, #42b983, #2ecc71);
  --fondo: #f3f7f9;
  --sombra: rgba(0, 0, 0, 0.1);
  --error: #e74c3c;
  --exito: #2ecc71;
  --info: #3498db;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8fafc;
  padding: 20px;
}

.biblioteca {
  max-width: 1200px;
  margin: auto;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease;
}

/* Título */
.biblioteca__titulo {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: #222;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px #c0f0d2;
}

.biblioteca__descripcion {
  max-width: 800px;
  margin: 0 auto 2rem;
  padding: 1.25rem;
  background: white;
  border-left: 4px solid var(--primario);
  border-radius: 0.5rem;
  font-size: 1.05rem;
  color: #4a5568;
  line-height: 1.7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Buscador */
.buscador {
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 1rem auto 2rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid var(--primario);
  border-radius: 12px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}
.buscador:focus {
  border-color: #2ecc71;
}

/* Categorías */
.categorias {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.categorias__btn {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 999px;
  background: #edf2f7;
  color: #4a5568;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.categorias__btn:hover {
  background: var(--primario);
  color: white;
  transform: translateY(-2px);
}

.categorias__btn.active {
  background: var(--primario);
  color: black;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(66, 185, 131, 0.3);
}

/* Libros */
.libros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
}

/* Mensajes */
.mensaje {
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #edf2f7;
  color: #2d3748;
}

.mensaje--cargando {
  background: #ebf8ff;
  color: #3182ce;
  border-left: 4px solid #3182ce;
}

.mensaje--error {
  background: #fff5f5;
  color: var(--error);
  border-left: 4px solid var(--error);
}

.mensaje--info {
  background: #f0fff4;
  color: #2f855a;
  border-left: 4px solid #38a169;
}

/* Animación */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .biblioteca {
    padding: 1.5rem;
  }
  
  .biblioteca__titulo {
    font-size: 2rem;
  }
  
  .libros {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .biblioteca {
    padding: 1rem;
  }
  
  .categorias {
    gap: 0.5rem;
  }
  
  .categorias__btn {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }
}
</style>

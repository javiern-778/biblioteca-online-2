<template>
  <div class="biblioteca">
    <h1 class="biblioteca__titulo">📚 Biblioteca Online</h1>

    <p class="biblioteca__descripcion">
      "Descubre una biblioteca digital pensada para ti: lecturas emocionantes de
      aventura, romance, suspenso, terror, ciencia ficción, fantasía, drama,
      biografías y mucho más. Ideal para estudiantes, lectores curiosos y amantes
      de los libros que quieren explorar nuevas historias desde cualquier lugar y
      en cualquier momento."
    </p>

    <!-- Botón para mostrar/ocultar formulario -->
    <div style="text-align: center; margin-bottom: 2rem;">
      <button
        @click="mostrarFormulario = !mostrarFormulario"
        class="toggle-btn"
        :aria-label="mostrarFormulario ? 'Ocultar formulario de nuevo libro' : 'Mostrar formulario para agregar nuevo libro'"
      >
        {{ mostrarFormulario ? '📕 Ocultar formulario' : '📘 Agregar nuevo libro' }}
      </button>
    </div>

    <!-- Formulario para agregar libros -->
    <AgregarLibro v-if="mostrarFormulario" />

    <!-- Buscador -->
    <input
      v-model="busqueda"
      type="text"
      placeholder="🔍 Buscar por título..."
      class="buscador"
      aria-label="Buscar libros por título"
    />

    <!-- Tabs de categorías -->
    <nav class="categorias" role="list">
      <button
        :class="['categorias__btn', { active: !tramaSeleccionada }]"
        @click="tramaSeleccionada = ''"
        role="listitem"
        aria-pressed="!tramaSeleccionada"
      >
        Todos
      </button>
      <button
        v-for="trama in tramasUnicas"
        :key="trama"
        :class="['categorias__btn', { active: tramaSeleccionada === trama }]"
        @click="tramaSeleccionada = trama"
        role="listitem"
        :aria-pressed="tramaSeleccionada === trama"
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
    <p v-else class="mensaje mensaje--info">
      📚 Mostrando {{ librosFiltrados.length }} libro(s)
    </p>

    <!-- Libros -->
    <section v-else class="libros" role="list">
      <LibroCard
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        @seleccionar="abrirModal"
        role="listitem"
      />
    </section>

    <!-- Modal -->
    <ModalLibro
      v-if="libroSeleccionado"
      :libro="libroSeleccionado"
      @cerrar="cerrarModal"
    >
      <template #loading>
        <p class="mensaje mensaje--cargando">Cargando detalles del libro...</p>
      </template>
    </ModalLibro>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import LibroCard from "./components/LibroCard.vue";
import ModalLibro from "./components/ModalLibro.vue";
import AgregarLibro from './components/AgregarLibro.vue';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const libros = ref([]);
const libroSeleccionado = ref(null);
const tramaSeleccionada = ref("");
const busqueda = ref("");
const isLoading = ref(true);
const error = ref(null);
const mostrarFormulario = ref(false);
const isModalLoading = ref(false);

const tramasUnicas = computed(() => {
  const tramas = new Set(libros.value.map(libro => libro.trama));
  return Array.from(tramas).sort();
});

const cargarLibros = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await axios.get(`${API_BASE}/api/libros`);
    libros.value = response.data;
  } catch (err) {
    console.error("Error al cargar libros:", err);
    error.value = "No se pudieron cargar los libros. Intente nuevamente más tarde.";
  } finally {
    isLoading.value = false;
  }
};

const normalizeText = (text) => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const librosFiltrados = computed(() => {
  const tramaFilter = tramaSeleccionada.value;
  const busquedaFilter = normalizeText(busqueda.value);

  return libros.value.filter(libro => {
    const libroTrama = libro.trama;
    const libroTitulo = normalizeText(libro.titulo);

    const coincideTrama = !tramaFilter || libroTrama === tramaFilter;
    const coincideBusqueda = libroTitulo.includes(busquedaFilter);
    return coincideTrama && coincideBusqueda;
  });
});

const abrirModal = async (libro) => {
  isModalLoading.value = true;
  libroSeleccionado.value = null; // para mostrar loading

  try {
    const response = await axios.get(`${API_BASE}/api/libro/${libro.id}`);
    libroSeleccionado.value = response.data;
  } catch (err) {
    console.error("Error obteniendo detalles del libro:", err);
    libroSeleccionado.value = libro; // fallback
  } finally {
    isModalLoading.value = false;
  }
};

const cerrarModal = () => {
  libroSeleccionado.value = null;
};

onMounted(() => {
  cargarLibros();
});
</script>


<style>
:root {
  --primario: #ff6f61; /* Color primario más vibrante */
  --gradiente: linear-gradient(to right, #ff6f61, #ffcc00); /* Gradiente más atractivo */
  --fondo: #f3f7f9;
  --sombra: rgba(0, 0, 0, 0.2);
  --error: #e74c3c;
  --exito: #2ecc71;
  --info: #3498db;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #ffafbd, #ffc3a0); /* Fondo más colorido */
  padding: 20px;
}

.biblioteca {
  max-width: 1200px;
  margin: auto;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.6s ease;
}

.biblioteca__titulo {
  font-size: 3.5rem; /* Título más grande */
  font-weight: bold;
  text-align: center;
  color: #222;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

.biblioteca__descripcion {
  max-width: 800px;
  margin: 0 auto 2rem;
  padding: 1.5rem;
  background: white;
  border-left: 4px solid var(--primario);
  border-radius: 0.5rem;
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toggle-btn {
  background: var(--primario);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem; /* Botón más grande */
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.3);
  transition: background 0.3s ease, transform 0.2s ease;
}

.toggle-btn:hover {
  background: #ffcc00; /* Color de fondo al pasar el mouse */
  transform: scale(1.05); /* Efecto de aumento */
}

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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.buscador:focus {
  border-color: #ffcc00; /* Color de borde al enfocar */
  box-shadow: 0 0 5px rgba(255, 204, 0, 0.5); /* Sombra al enfocar */
}

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
  transition: all 0.3s ease;
}

.categorias__btn:hover {
  background: var(--primario);
  color: white;
  transform: translateY(-2px);
}

.categorias__btn.active {
  background: var(--primario);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(255, 111, 97, 0.3);
}

.libros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
}

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

@media (max-width: 768px) {
  .biblioteca {
    padding: 1.5rem;
  }

  .biblioteca__titulo {
    font-size: 2.5rem; /* Título más pequeño en pantallas pequeñas */
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

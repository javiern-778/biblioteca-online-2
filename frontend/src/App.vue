<template>
  <div class="biblioteca">
    <h1 class="biblioteca__titulo">📚 Biblioteca Online</h1>

    <p class="biblioteca__descripcion">
      Explora una colección única de libros digitales con categorías como aventura, romance, suspenso, terror, ciencia ficción, fantasía, drama, biografías y más. Vive emociones intensas y viajes inolvidables desde cualquier lugar.
    </p>

    <!-- Menú de categorías -->
    <nav class="categorias">
      <button
        :class="['categorias__btn', { active: !tramaSeleccionada }]"
        @click="tramaSeleccionada = ''"
      >
        Todos
      </button>
      <button
        v-for="trama in tramas"
        :key="trama"
        :class="['categorias__btn', { active: tramaSeleccionada === trama }]"
        @click="tramaSeleccionada = trama"
      >
        {{ trama }}
      </button>
    </nav>

    <!-- Mensajes -->
    <p v-if="isLoading" class="mensaje mensaje--cargando">📦 Cargando libros...</p>
    <p v-if="error" class="mensaje mensaje--error">⚠️ {{ error }}</p>

    <!-- Libros -->
    <section class="libros">
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

const cargarLibros = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const res = await fetch("http://localhost:3000/api/libros");
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    libros.value = await res.json();
  } catch (err) {
    error.value = "No se pudieron cargar los libros. Intente nuevamente más tarde.";
  } finally {
    isLoading.value = false;
  }
};

const abrirModal = (libro) => libroSeleccionado.value = libro;
const cerrarModal = () => libroSeleccionado.value = null;

const librosFiltrados = computed(() =>
  tramaSeleccionada.value
    ? libros.value.filter(libro => libro.trama === tramaSeleccionada.value)
    : libros.value
);

onMounted(() => cargarLibros());
</script>

<style>
:root {
  --primario: #42b983;
  --gradiente: linear-gradient(to right, #42b983, #2ecc71);
  --fondo: #f3f7f9;
  --sombra: rgba(0, 0, 0, 0.1);
}

.biblioteca {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  background: var(--fondo);
  border-radius: 16px;
  box-shadow: 0 8px 30px var(--sombra);
  animation: fadeIn 0.6s ease;
}

.biblioteca__titulo {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  background: var(--gradiente);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
}

.biblioteca__descripcion {
  max-width: 900px;
  margin: 0 auto 2rem;
  padding: 1.5rem;
  background: white;
  border-left: 6px solid var(--primario);
  border-radius: 0.75rem;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.7;
  box-shadow: 0 4px 12px var(--sombra);
}

/* Categorías */
.categorias {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.categorias__btn {
  padding: 0.6rem 1.4rem;
  border: 2px solid transparent;
  border-radius: 999px;
  background: #e9f5f1;
  color: #333;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.categorias__btn:hover {
  background: var(--primario);
  color: white;
  transform: scale(1.05);
}

.categorias__btn.active {
  background: var(--primario);
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 10px var(--sombra);
}

/* Libros */
.libros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}

/* Mensajes */
.mensaje {
  text-align: center;
  padding: 1rem;
  margin: 2rem 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.mensaje--cargando {
  background: #e8f5e9;
  color: #388e3c;
}

.mensaje--error {
  background: #f8d7da;
  color: #c62828;
}

/* Animaciones */
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
  .libros {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .biblioteca__titulo {
    font-size: 2rem;
  }
}
</style>

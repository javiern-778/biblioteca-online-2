<template>
  <div class="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-xl font-bold">{{ editando ? 'Editar Libro' : 'Agregar Libro' }}</h2>

    <form @submit.prevent="editando ? actualizarLibro() : agregarLibro()">
      <div class="space-y-2">
        <div>
          <label for="id" class="block font-medium">ID</label>
          <input v-model="libro.id" type="text" id="id" class="w-full p-2 border rounded" required />
        </div>

        <div>
          <label for="titulo" class="block font-medium">Título</label>
          <input v-model="libro.titulo" type="text" id="titulo" class="w-full p-2 border rounded" required />
        </div>

        <div>
          <label for="autor" class="block font-medium">Autor</label>
          <input v-model="libro.autor" type="text" id="autor" class="w-full p-2 border rounded" required />
        </div>

        <div>
          <label for="descripcion" class="block font-medium">Descripción</label>
          <textarea v-model="libro.descripcion" id="descripcion" class="w-full p-2 border rounded" rows="3" required></textarea>
        </div>

        <div>
          <label for="archivo" class="block font-medium">Archivo PDF</label>
          <input @change="handleArchivo" type="file" id="archivo" class="w-full p-2 border rounded" />
        </div>

        <div>
          <label for="imagen" class="block font-medium">Imagen del Libro</label>
          <input @change="handleImagen" type="file" id="imagen" class="w-full p-2 border rounded" accept="image/*" />
        </div>

        <div>
          <label for="contenido" class="block font-medium">Contenido</label>
          <textarea v-model="libro.contenido" id="contenido" class="w-full p-2 border rounded" rows="4" required></textarea>
        </div>

        <div>
          <label for="trama" class="block font-medium">Trama</label>
          <input v-model="libro.trama" type="text" id="trama" class="w-full p-2 border rounded" required />
        </div>

        <button type="submit" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {{ editando ? 'Actualizar Libro' : 'Agregar Libro' }}
        </button>
      </div>
    </form>

    <div v-if="libros.length" class="mt-6">
      <h3 class="text-lg font-semibold">Libros agregados:</h3>
      <ul class="mt-2 space-y-2">
        <li v-for="(libroItem, index) in libros" :key="libroItem.id" class="border p-2 rounded shadow-sm">
          <strong>{{ libroItem.titulo }}</strong> por {{ libroItem.autor }}

          <div class="mt-2 space-x-2">
            <button @click="editarLibro(index)" class="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">
              Editar
            </button>
            <button @click="eliminarLibro(index)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Eliminar
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/libros';

const libro = ref({
  id: '',
  titulo: '',
  autor: '',
  descripcion: '',
  archivo: null,
  imagen: null,
  contenido: '',
  trama: ''
});

const libros = ref([]);
const editando = ref(false);
const indiceEditar = ref(null);

async function cargarLibros() {
  try {
    const res = await axios.get(API_URL);
    libros.value = res.data;
  } catch (error) {
    console.error("Error cargando libros:", error);
    alert("Error al cargar los libros.");
  }
}

async function agregarLibro() {
  if (!libro.value.titulo || !libro.value.autor || !libro.value.descripcion || !libro.value.contenido || !libro.value.trama) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('titulo', libro.value.titulo);
    formData.append('autor', libro.value.autor);
    formData.append('descripcion', libro.value.descripcion);
    // formData.append('contenido', libro.value.contenido);
    formData.append('trama', libro.value.trama);

    if (libro.value.archivo) formData.append('archivo', libro.value.archivo);
    if (libro.value.imagen) formData.append('imagen', libro.value.imagen);

    await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    await cargarLibros();
    limpiarFormulario();
    alert("Libro agregado correctamente.");
  } catch (error) {
    console.error("Error agregando libro:", error);
    alert("Error al agregar el libro.");
  }
}

function editarLibro(index) {
  libro.value = { ...libros.value[index] };
  indiceEditar.value = index;
  editando.value = true;
}

async function actualizarLibro() {
  if (!libro.value.id) return;

  if (!libro.value.titulo || !libro.value.autor || !libro.value.descripcion || !libro.value.contenido || !libro.value.trama) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('titulo', libro.value.titulo);
    formData.append('autor', libro.value.autor);
    formData.append('descripcion', libro.value.descripcion);
    // formData.append('contenido', libro.value.contenido);
    formData.append('trama', libro.value.trama);

    if (libro.value.archivo instanceof File) formData.append('archivo', libro.value.archivo);
    if (libro.value.imagen instanceof File) formData.append('imagen', libro.value.imagen);

    await axios.put(`${API_URL}/${libro.value.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    await cargarLibros();
    limpiarFormulario();
    alert("Libro actualizado correctamente.");
  } catch (error) {
    console.error("Error actualizando libro:", error);
    alert("Error al actualizar el libro.");
  }
}

async function eliminarLibro(index) {
  const libroAEliminar = libros.value[index];
  if (!libroAEliminar.id) return;

  if (!confirm(`¿Seguro que deseas eliminar "${libroAEliminar.titulo}"?`)) return;

  try {
    await axios.delete(`${API_URL}/${libroAEliminar.id}`);
    libros.value.splice(index, 1);
    alert("Libro eliminado.");
  } catch (error) {
    console.error("Error eliminando libro:", error);
    alert("Error al eliminar el libro.");
  }
}

function limpiarFormulario() {
  libro.value = {
    id: '',
    titulo: '',
    autor: '',
    descripcion: '',
    archivo: null,
    imagen: null,
    contenido: '',
    trama: ''
  };
  editando.value = false;
  indiceEditar.value = null;
}

function handleArchivo(event) {
  libro.value.archivo = event.target.files[0];
}

function handleImagen(event) {
  libro.value.imagen = event.target.files[0];
}

onMounted(() => {
  cargarLibros();
});
</script>

  
<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  outline: none;
  border-color: #4299e1; /* Azul suave */
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}

button {
  transition: background-color 0.2s ease;
}
</style>

  
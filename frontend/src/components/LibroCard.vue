<template>
  <div class="libro-card border rounded-xl shadow-md p-4 hover:shadow-lg transition" @click="$emit('seleccionar', libro)">
    <div class="libro-imagen-container mb-3">
      <img
        :src="`http://localhost:3000/images/${libro.imagen}`"
        :alt="libro.titulo"
        class="libro-imagen w-full h-48 object-cover rounded-md"
      />
    </div>
    <div class="libro-info space-y-1">
      <h3 class="libro-titulo text-lg font-semibold">{{ libro.titulo }}</h3>
      <p class="libro-autor text-sm text-gray-600">Autor: {{ libro.autor }}</p>
      <p class="libro-trama text-sm text-gray-500">Trama: {{ libro.trama }}</p>
      <p class="libro-contenido text-sm text-gray-500">Contenido: {{ libro.contenido }}</p>
      <p class="libro-descripcion text-sm text-gray-700">{{ truncateDescription(libro.descripcion) }}</p>
    </div>

    <!-- Botones PDF -->
    <div class="mt-4 flex gap-3">
      <a
        :href="`http://localhost:3000/libros/${libro.archivo}`"
        target="_blank"
        class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        @click.stop
      >
        Ver PDF
      </a>
      <a
        :href="`http://localhost:3000/libros/${libro.archivo}`"
        download
        class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        @click.stop
      >
        Descargar
      </a>
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
  return desc && desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
};
</script>



<style scoped>
.libro-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
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
  font-size: 1.1rem;
  color: #2c3e50;
}

.libro-autor {
  margin: 0 0 6px 0;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.libro-trama {
  margin: 0 0 10px 0;
  font-weight: bold;
  color: #333;
  font-size: 0.85rem;
}

.libro-descripcion {
  margin: 0;
  font-size: 0.8rem;
  color: #34495e;
  flex-grow: 1;
}
</style>

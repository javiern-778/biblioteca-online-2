<template>
  <div class="modal-overlay" @click.self="cerrar" tabindex="-1">
    <div class="modal-container">
      <button class="modal-cerrar" @click="cerrar" aria-label="Cerrar modal">×</button>
      <div class="modal-content">
        <!-- Portada -->
        <div class="modal-portada">
          <img :src="`${BASE_URL}/images/${libro.imagen}`" :alt="libro.titulo" class="portada-img" />
        </div>

        <!-- Información -->
        <div class="modal-info">
          <h2 class="modal-titulo">{{ libro.titulo }}</h2>
          <p class="modal-edicion" v-if="libro.edicion">{{ libro.edicion }}</p>
          <p class="modal-autor">{{ libro.autor }}</p>
          <p class="modal-trama" v-if="libro.trama">{{ libro.trama }}</p>
          <p class="modal-contenido" v-if="libro.contenido">{{ libro.contenido }}</p>
          <div class="modal-descripcion" v-if="libro.descripcion">
            <p>{{ libro.descripcion }}</p>
          </div>

          <div class="modal-contenidos">
            <h3>Contenido:</h3>
            <ul v-if="libro.contenidos && libro.contenidos.length" class="capitulos-lista">
              <li v-for="capitulo in libro.contenidos" :key="capitulo.capitulo" class="capitulo-item">
                <span class="capitulo-numero">Capítulo {{ capitulo.capitulo }}:</span>
                <span class="capitulo-titulo">{{ capitulo.titulo }}</span>
                <span class="capitulo-pagina"> (Pág. {{ capitulo.pagina }})</span>
              </li>
            </ul>
            <p v-else>No hay información de contenido disponible para este libro</p>
          </div>

          <!-- Botones -->
          <div class="modal-botones">
            <button class="descargar-btn" @click="descargarLibro" title="Descargar libro" :disabled="!libro.archivo">
              <i class="fas fa-download"></i> Descargar
            </button>
            <a
              v-if="libro.archivo"
              :href="`${BASE_URL}/libros/${libro.archivo}`"
              target="_blank"
              rel="noopener noreferrer"
              class="abrir-btn"
              title="Abrir libro en nueva pestaña"
            >
              Abrir en línea
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const BASE_URL = 'http://localhost:3000';

const props = defineProps({
  libro: {
    type: Object,
    required: true,
    default: () => ({
      titulo: '',
      edicion: '',
      autor: '',
      descripcion: '',
      imagen: '',
      archivo: '',
      contenidos: [],
      trama: ''
    }),
  },
});

const emit = defineEmits(['cerrar']);

const cerrar = () => {
  emit('cerrar');
};

const descargarLibro = () => {
  if (!props.libro.archivo) return;

  const nombreArchivo = props.libro.archivo.split('/').pop() || 'libro.pdf';
  fetch(`${BASE_URL}/libros/${props.libro.archivo}`)
    .then(res => {
      if (!res.ok) throw new Error('Archivo no encontrado');
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch(err => {
      alert('No se pudo descargar el archivo.');
      console.error(err);
    });
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.modal-cerrar {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #7f8c8d;
  z-index: 10;
  transition: color 0.3s ease;
}

.modal-cerrar:hover {
  color: #e74c3c;
}

.modal-content {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.modal-portada {
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.portada-img {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.modal-info {
  flex: 2 1 400px;
  display: flex;
  flex-direction: column;
}

.modal-titulo {
  font-size: 2rem;
  margin-bottom: 5px;
  color: #2c3e50;
  font-weight: bold;
}

.modal-edicion {
  font-size: 1.1rem;
  color: #42b983;
  font-weight: 600;
  margin-bottom: 10px;
}

.modal-autor {
  font-size: 1.3rem;
  color: #7f8c8d;
  margin-bottom: 8px;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.modal-trama {
  font-weight: bold;
  color: #555;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.modal-descripcion {
  font-size: 1rem;
  line-height: 1.7;
  color: #34495e;
  margin-bottom: 25px;
}

.modal-contenidos {
  background-color: #f9f9f9;
  border-left: 4px solid #42b983;
  padding: 15px 20px;
  border-radius: 0 5px 5px 0;
  margin-bottom: 30px;
  max-height: 300px;
  overflow-y: auto;
}

.modal-contenidos h3 {
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 1.2rem;
  color: #2c3e50;
}

.capitulos-lista {
  list-style: disc inside;
  padding-left: 1rem;
  color: #444;
  margin: 0;
}

.capitulo-item {
  display: grid;
  grid-template-columns: 80px 1fr 70px;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.capitulo-item:last-child {
  border-bottom: none;
}

.capitulo-numero {
  font-weight: 600;
  color: #2c3e50;
}

.capitulo-titulo {
  color: #34495e;
  text-align: left;
}

.capitulo-pagina {
  text-align: right;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.modal-botones {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.descargar-btn,
.abrir-btn {
  background: linear-gradient(to right, #42b983, #2ecc71);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
  transition: all 0.3s ease;
}

.descargar-btn:hover,
.abrir-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(66, 185, 131, 0.4);
}

.descargar-btn i {
  font-size: 1.2rem;
}

/* Disabled button */
.descargar-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  box-shadow: none;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
  }

  .modal-portada {
    margin-bottom: 25px;
  }

  .modal-titulo {
    font-size: 1.6rem;
  }

  .capitulo-item {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .capitulo-numero,
  .capitulo-pagina {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .modal-container {
    padding: 20px;
  }

  .modal-titulo {
    font-size: 1.4rem;
  }

  .modal-autor {
    font-size: 1.1rem;
  }

  .descargar-btn,
  .abrir-btn {
    width: 100%;
  }
}
</style>

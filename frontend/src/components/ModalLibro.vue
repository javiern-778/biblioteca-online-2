<template>
  <div class="modal-overlay" @click.self="cerrar">
    <div class="modal-container">
      <button class="modal-cerrar" @click="cerrar">×</button>
      <div class="modal-actions">
        <button class="descargar-btn" @click="descargarLibro">
          <i class="fas fa-download"></i> Descargar PDF
        </button>
      </div>
      <iframe 
        :src="archivo" 
        class="pdf-viewer"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  archivo: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['cerrar']);

const cerrar = () => {
  emit('cerrar');
};

const descargarLibro = () => {
  // Crear un enlace temporal para la descarga
  const link = document.createElement('a');
  link.href = props.archivo;
  
  // Extraer el nombre del archivo de la URL
  const nombreArchivo = props.archivo.split('/').pop() || 'libro.pdf';
  link.download = nombreArchivo;
  
  // Simular click en el enlace
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 900px;
  height: 90vh;
  position: relative;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.modal-actions {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
}

.descargar-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.descargar-btn:hover {
  background-color: #3aa876;
}

.descargar-btn i {
  font-size: 1rem;
}

.modal-cerrar {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  z-index: 10;
}

.modal-cerrar:hover {
  color: #e74c3c;
}

.pdf-viewer {
  width: 100%;
  flex-grow: 1;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
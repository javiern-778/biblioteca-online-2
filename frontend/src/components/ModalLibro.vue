<template>
  <div class="modal-overlay" @click.self="cerrar">
    <div class="modal-container">
      <button class="modal-cerrar" @click="cerrar">×</button>
      <iframe 
        :src="archivo" 
        class="pdf-viewer"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
defineProps({
  archivo: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['cerrar']);

const cerrar = () => {
  emit('cerrar');
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
  height: 100%;
}
</style>
<template>
    <div class="overlay" @click.self="cerrar">
      <div class="modal">
        <button class="btn-cerrar" @click="cerrar" aria-label="Cerrar modal">×</button>
        <iframe :src="archivo" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    archivo: String
  })
  
  const emit = defineEmits(['cerrar'])
  
  function cerrar() {
    emit('cerrar')
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
  
  .overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
  }
  
  .modal {
    position: relative;
    width: 85vw;
    max-width: 960px;
    height: 85vh;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  iframe {
    border: none;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    border-radius: 0 0 12px 12px;
  }
  
  .btn-cerrar {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #e74c3c;
    border: none;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.6);
    transition: background-color 0.3s ease;
  }
  
  .btn-cerrar:hover {
    background: #c0392b;
  }
  </style>
  
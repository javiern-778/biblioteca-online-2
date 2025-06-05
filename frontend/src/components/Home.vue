<template>
    <div class="home-container">
      <h1>Biblioteca Online</h1>
      
      <section class="hero">
        <div class="hero-content">
          <h2>Descubre nuestro catálogo</h2>
          <p>Explora miles de libros en diferentes géneros y formatos</p>
          <button @click="exploreCatalog" class="cta-button">Ver catálogo</button>
        </div>
        <div class="hero-image">
          <!-- Espacio para imagen representativa -->
          <div class="placeholder-image">📚</div>
        </div>
      </section>
  
      <!-- Se eliminó la sección de libros destacados -->
  
      <section class="categories">
        <h3>Categorías populares</h3>
        <div class="category-list">
          <div v-for="category in categories" :key="category" class="category-card">
            {{ category }}
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        // Se eliminó featuredBooks
        categories: [
        'aventura', 'romance', 'suspenso', 'terror',
        'ciencia ficción', 'fantasía', 'historica',
        'drama', 'biografías', 'coming of age', 'comedia'
        ]
      }
    },
    methods: {
      exploreCatalog() {
        // Navegar al catálogo (requiere configuración de rutas)
        this.$router.push('/catalogo');
      }
    }
  }
  </script>
  
  <<style scoped>
  .home-container {
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
    text-align: center;
  }
  
  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
  }
  
  .hero-content {
    flex: 1;
    text-align: left;
  }
  
  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .placeholder-image {
    font-size: 5rem;
  }
  
  .cta-button {
    padding: 0.75rem 1.5rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cta-button:hover {
    background-color: #1e40af;
  }
  
  .categories {
    margin-top: 2rem;
  }
  
  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  
  .category-card {
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    text-transform: capitalize;
  }
  </style>
  
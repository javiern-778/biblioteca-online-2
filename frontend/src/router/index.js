import { createRouter, createWebHistory } from 'vue-router'
import LibroDetalle from '../components/LibroDetalle.vue'
import Home from '../components/Home.vue' // Tu página principal

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/libro/:id',
    name: 'LibroDetalle',
    component: LibroDetalle
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

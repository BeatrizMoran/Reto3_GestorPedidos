import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Productos from '../views/Productos.vue';
import Pedidos from '../views/Pedidos.vue';
import Perfil from '../views/Perfil.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/productos', name: 'productos', component: Productos }, // Asegúrate de tener la propiedad "name" definida correctamente
  { path: '/pedidos', component: Pedidos },
  { path: '/perfil', component: Perfil },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Productos from '../views/Productos.vue';
import Pedidos from '../views/Pedidos.vue';
import Perfil from '../views/Perfil.vue';
import Nav from "../components/nav.vue"
import Body from "../components/body.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/productos', name: 'productos', component: Productos },
  { path: '/pedidos', component: Pedidos },
  { path: '/perfil', component: Perfil }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

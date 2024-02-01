import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Productos from '../views/Productos.vue';
import Pedidos from '../views/Pedidos.vue';
import Perfil from '../views/Perfil.vue';
import Cart from '../views/CartView.vue';

import Nav from "../components/nav.vue"
import Body from "../components/body.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/productos', name: 'productos', component: Productos },
  { path: '/pedidos', component: Pedidos },
  { path: '/perfil', component: Perfil },
  { path: '/cart', component: Cart }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

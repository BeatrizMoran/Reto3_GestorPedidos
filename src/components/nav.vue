<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-between">

        <!-- Botón desplegable -->
        <div class="col-2 col-lg-1 px-4">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>


        <!-- Logo -->
        <div class="col-2 col-lg-1 px-1 text-center">
          <img src="../assets/logo.png" alt="Logo" class="img-fluid">
        </div>


        <!-- Contenido del navbar -->
        <div class="collapse navbar-collapse col-md-5 col-lg-6 px-4" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active" exact>Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/productos" class="nav-link" active-class="active">Productos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pedidos" class="nav-link" active-class="active">Pedidos</router-link>
            </li>
            <li class="nav-item"  v-show="isPerfilVisible" >
              <router-link to="/perfil" class="nav-link" active-class="active"  >Perfil</router-link>
            </li>
            <li class="nav-item col-5">
              <input class="form-control form-control-sm" type="search" placeholder="Insertar Código..." aria-label="Codificacion" @keypress.enter="checkCodigo" v-model="codigo" enabled>
            </li>
          </ul>
        </div>


        <!-- Buscador -->
        <div class="col-7 col-md-7 col-lg-4 px-4">
          <form class="d-flex" @submit.prevent="buscar">
            <input class="form-control me-2"  type="search" v-model="terminoBusqueda" placeholder="Buscar productos..." aria-label="Buscar">
            <button class="btn btn-outline-success" type="submit" @click="buscar">Buscar</button>
          </form>
        </div>


      </nav>
    </div>
  </div>
</template>

<script setup>
import { useProductosStore } from '../stores/productos';
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['listaProductos']);  // Usar 'listaFiltrada'

const terminoBusqueda = ref('');
const productosStore = useProductosStore();
const listaProductos = ref([]);

const buscar = async () => {
  try {
    if (terminoBusqueda.value === "") {
      listaProductos.value = await productosStore.cargarProductosDesdeAPI();
      console.log("Estoy en el nav, todos los productos", listaProductos.value);
      emit('listaProductos', listaProductos.value);
    } else {
      listaProductos.value = await productosStore.buscarProductos(terminoBusqueda.value);
      console.log("Estoy en el nav, búsqueda filtrada: ", listaProductos.value);
      emit('listaProductos', listaProductos.value);
    }
  } catch (error) {
    console.error('Error al buscar productos:', error.message);
  }
};
</script>



<style lang="scss" scoped>
@import '../assets/style.scss';
img {
  max-width: 100%; 
  height: auto; 
  max-height: 50px; 
}
</style>
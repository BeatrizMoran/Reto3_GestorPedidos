<template>
  
    <Nav class="row" @listaProductos="fcambiarLista" @buscador="fbuscador"></Nav>
    <br>
    <div class="row">
      <AsideA :categories="categories" @cambiarCategorias="handleCategoryChange" class="col-12 col-md-4 col-lg-3 my-4 mx-2"></AsideA>
      <BodyA class="col-12 col-md-7 col-lg-7 my-4 mx-2" :listaProductos="listaProductos" :buscador="terminoBusqueda" :selectedCategories="selectedCategories"></BodyA>
    </div>

</template>

<script setup>
//imports
import Nav from '../components/nav.vue';
import AsideA from '../components/aside.vue';
import BodyA from '../components/body.vue';
import {  ref } from 'vue';
import { useProductosStore } from '@/stores/productos';

//variables
const listaProductos = ref([]);
const activo = ref(false);
const terminoBusqueda = ref("");
const categories = ref([]);
const selectedCategories = ref([]); 


function fcambiarLista(lista) {
  listaProductos.value = lista;
}

function fbuscador(buscador) {

  terminoBusqueda.value = buscador;

}


function handleCategoryChange(selectedCategoriesFromAside) {
  selectedCategories.value = selectedCategoriesFromAside; 
}
</script>
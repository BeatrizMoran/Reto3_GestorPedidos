<template>
  
    <Nav class="row" @listaProductos="fcambiarLista" @buscador="fbuscador"></Nav>
    <br>
    <div class="row">
      <AsideA :categories="categories" @cambiarCategorias="handleCategoryChange" class="col-12 col-md-4 col-lg-3 my-4 mx-2"></AsideA>
      <BodyA class="col-12 col-md-7 col-lg-7 my-4 mx-2" :listaProductos="listaProductos" :buscador="terminoBusqueda" :selectedCategories="selectedCategories"></BodyA>
    </div>

</template>

<script setup>
import Nav from '../components/nav.vue';
import AsideA from '../components/aside.vue';
import BodyA from '../components/body.vue';


import {  ref } from 'vue';
import { useProductosStore } from '@/stores/productos';

const listaProductos = ref([]);
const activo = ref(false);
const terminoBusqueda = ref("");


function fcambiarLista(lista) {


  listaProductos.value = lista;

  //console.log("cambiando lista...")
  console.log(listaProductos.value)

}

function fbuscador(buscador) {

  terminoBusqueda.value = buscador;
  //console.log("buscador en vista", buscador);

}
const categories = ref([]);
const selectedCategories = ref([]); 

function handleCategoryChange(selectedCategoriesFromAside) {
  //console.log("categoria recibida en prodoctos",selectedCategoriesFromAside);
  selectedCategories.value = selectedCategoriesFromAside; 
  //console.log("categoria a enviar al body ",selectedCategories.value);
}
</script>
<template>
  <div class="container-fluid">
    <Nav class="row" @listaProductos="fcambiarLista" @buscador="fbuscador"></Nav>
    <br>
    <div class="row">
      <AsideA :categories="categories" @cambiarCategorias="handleCategoryChange" class="col-5 col-md-4 col-lg-3"></AsideA>
      <BodyA class="col-6 col-md-7 col-lg-8" :listaProductos="listaProductos.value" :buscador="buscador.value" :selectedCategories="selectedCategories"></BodyA>
    </div>
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
const buscador = ref("");


function fcambiarLista(lista) {


  listaProductos.value = lista;

  console.log("cambiando lista...")
  console.log(listaProductos)

}

function fbuscador(buscador) {

  buscador.value = buscador;
  console.log("ickkck", buscador);

}
const categories = ref([]);
const selectedCategories = ref([]); 

function handleCategoryChange(selectedCategoriesFromAside) {
  console.log("categoria recibida en prodoctos",selectedCategoriesFromAside);
  selectedCategories.value = selectedCategoriesFromAside; 
  console.log("categoria a enviar al body ",selectedCategories.value);
}
</script>
<template>
  <div>
    <Nav @listaProductos="fcambiarLista" ></Nav>
    <br>
    <div class="row">
      <AsideA class="col-5 col-md-4 col-lg-3"></AsideA>
      <BodyA class="col-6 col-md-7 col-lg-8" :listaProductos="listaProductos.value"></BodyA>
    </div>
  </div>
</template>

<script setup>
import Nav from '../components/nav.vue';
import AsideA from '../components/aside.vue';
import BodyA from '../components/body.vue';


import {  ref } from 'vue';

const listaProductos = ref([]);
const activo = ref(false);


function fcambiarLista(lista) {


  listaProductos.value = lista;

  console.log("cambiando lista...")
  console.log(listaProductos.value)

}

</script>

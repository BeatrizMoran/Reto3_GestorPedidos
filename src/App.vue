<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/nav.vue'
import AsideA from './components/aside.vue'
import BodyA from './components/body.vue'
import Index from './components/index.vue'
import Pedidos from './components/pedidos.vue'
import Perfil from './components/perfil.vue'



</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <NavBar class="col-12 col-lg-12"></NavBar>
    </div>
    <br>
 

    <Index class="col-12 col-lg-12"></Index>
   
    <!--<Perfil></Perfil> -->
    <!--

         <div class="row">
      <AsideA class="col-5 col-md-4 col-lg-3"></AsideA>
      <BodyA class="col-7 col-md-8 col-lg-9"></BodyA>
    </div>

     -->
    
    <!--   <Pedidos class="col-12 col-lg-12"></Pedidos>
       -->


  </div>

</template>



<style lang="scss" scoped>

@import './assets/style.scss';

</style>

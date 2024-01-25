<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/nav.vue'
import AsideA from './components/aside.vue'
import BodyA from './components/body.vue'



</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <NavBar class="col-12 col-lg-12"></NavBar>
    </div>
    <br>
    <div class="row">
      <AsideA class="col-5 col-md-4 col-lg-3"></AsideA>
      <BodyA class="col-7 col-md-8 col-lg-9"></BodyA>
    </div>
  </div>
</template>



<style scoped>

</style>

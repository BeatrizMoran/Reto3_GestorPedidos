<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/nav.vue'
import AsideA from './components/aside.vue'
import BodyA from './components/body.vue'



</script>

<template>
  <div class="container-fluid">
    <NavBar class="custom-navbar"></NavBar>
    <AsideA class="custom-aside"></AsideA>
    <BodyA class="custom-body"></BodyA>
  </div>

 
</template>


<style scoped>

*
{
  margin: 0;
  padding: 0;
  box-sizing: 0;
}
.container-fluid {
  height: 100vh; 
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 1fr 3fr;
  grid-template-areas: 
  "nav nav"
  "asi bod";
}

.custom-navbar {
  grid-area: nav;
  background-color: green; 
}

.custom-aside {
  grid-area: asi;
  background-color: red;
}

.custom-body {
  grid-area: bod;

}


</style>

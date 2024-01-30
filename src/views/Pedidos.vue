<template>
    <div>
      <Nav></Nav>
      <div class="row">
        <Pedidos class="col-12 col-lg-12"></Pedidos>
    </div>
  
    </div>
  </template>
  
  <script>
  import Nav from '../components/nav.vue';
  import Pedidos from '../components/pedidos.vue';


  
  export default {
    components: {
        Nav,
        Pedidos
    }
  };
  </script>
  
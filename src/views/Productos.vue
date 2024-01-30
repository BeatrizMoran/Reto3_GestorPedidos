<template>
    <div>
      <Nav></Nav>
      <br>
      <div class="row">
      <AsideA class="col-5 col-md-4 col-lg-3"></AsideA>
      <BodyA class="col-7 col-md-8 col-lg-9"></BodyA>
    </div>
  
    </div>
  </template>
  
  <script>
  import Nav from '../components/nav.vue';
  import AsideA from '../components/aside.vue';
  import BodyA from '../components/body.vue';

  
  export default {
    components: {
        Nav,
      BodyA,
      AsideA
    }
  };
  </script>
  
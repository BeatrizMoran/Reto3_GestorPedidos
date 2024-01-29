<template>
    <aside class="bg-light d-flex flex-column justify-content-center align-items-center py-2 px-4 rounded">
      <h3 class="mb-4 category-title" style="max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">Categorías</h3>
      <div class="d-flex flex-wrap" style="max-width: 100%;">
        <div v-for="category in categories" :key="category.id" class="form-check mb-2 me-4" style="width: 100%;">
          <input class="form-check-input" type="checkbox" v-model="selectedCategories" :value="category.id" @change="handleCategoryChange">
          <label class="form-check-label" style="max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ category.name }}</label>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const categories = [
    { id: 1, name: 'Radler' },
    { id: 2, name: 'Don Simon buenos dias' },
    { id: 3, name: 'Careverga  Careverga CarevergaCareverga Careverga Careverga Careverga Careverga ' },
    { id: 4, name: 'Don Simon buenos dias' },
    { id: 5, name: 'Don Simon buenos dias' },
    { id: 6, name: 'Don Simon buenos dias' },
    { id: 7, name: 'Don Simon buenos dias' },


  ];
  

  const selectedCategories = ref([]);
  

  const handleCategoryChange = () => {
    context.emit('category-change', selectedCategories);
  };
  </script>
  
  <style lang="scss" scoped>

  @import '../assets/style.scss';
  
  </style>
  
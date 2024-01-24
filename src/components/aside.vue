<template>
    <aside class="d-flex flex-column justify-content-center align-items-center p-4">
      <h2 class="mb-4">Categorías</h2>
      <div class="d-flex flex-wrap">
        <div v-for="category in categories" :key="category.id" class="form-check mb-2 me-4">
          <input class="form-check-input" type="checkbox" v-model="selectedCategories" :value="category.id" @change="handleCategoryChange">
          <label class="form-check-label">{{ category.name }}</label>
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
  
  <style scoped>

  </style>
  
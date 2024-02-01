<template>
  <div class="row">

    <aside class="aside-container d-flex flex-column justify-content-center align-items-center py-2 px-4 rounded">
      <h3 class="mb-4 category-title">Categorías</h3>
        <div v-for="category in categories" :key="category.id" class="form-check mb-2 me-4" style="width: 100%;">
          <input class="form-check-input" type="checkbox" :checked="isSelected(category.nombre)" @change="toggleCategory(category.nombre)">
          <label class="form-check-label">{{ category.nombre }}</label>
        </div>
    </aside>
  
  </div>

</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { useCategoriasStore } from '../stores/categorias';

const CategoriasStore = useCategoriasStore();
const categories = ref([]);
const selectedCategories = ref([]); 
const emit = defineEmits(['cambiarCategorias']);

onBeforeMount(async () => {
  categories.value = await CategoriasStore.cargarCategoriasDesdeAPI();
});

const isSelected = (category) => selectedCategories.value.includes(category);

const toggleCategory = (category) => {
  if (isSelected(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
  } else {
    selectedCategories.value.push(category);
  }

  console.log("Mandando al padre las categorías...");
  emit('cambiarCategorias', selectedCategories.value);
};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
</style>
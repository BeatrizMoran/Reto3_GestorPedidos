<template>

    <aside class="row aside-container d-flex flex-column justify-content-center  py-2 px-4 rounded-3">
      <div class="col-12 d-flex justify-content-center">
        <h3 class="mb-4 category-title">Categorías</h3>
      </div>
      
      <div class="form-check mb-2 me-4 rounded-3" style="width: 100%;">
        <input class="form-check-input" type="checkbox" @change="uncheckAll" id="ckall" v-model="selectAll" :disabled="selectedCategories.length === 0">
        <label for="ckall" class="form-check-label" id="ckall" >Desmarcar todos</label>
      </div>

      <div v-for="category in categories" :key="category.id" class="form-check mb-2 me-4 rounded-3" style="width: 100%;">
        <input class="form-check-input" :id="'ck_' + category.id" type="checkbox" :checked="isSelected(category.nombre)" @change="toggleCategory(category.nombre)">
        <label :for="'ck_' + category.id" class="form-check-label">{{ category.nombre }}</label>
      </div>

    </aside>
  
</template>

<script setup>
//imports
import { ref, onBeforeMount, defineEmits } from 'vue';
import { useCategoriasStore } from '../stores/categorias';

//variables
const CategoriasStore = useCategoriasStore();
const categories = ref([]);
const selectedCategories = ref([]); 
const emit = defineEmits(['cambiarCategorias']);
const isSelected = (category) => selectedCategories.value.includes(category);
const selectAll = ref(false);

//antes de montar, cargar la variable con las categorias de la base de datos
onBeforeMount(async () => {
  categories.value = await CategoriasStore.cargarCategoriasDesdeAPI();
});


//Dependiendo de lo escogido, manda el valor de la variable a la vista padre
const toggleCategory = (category) => {
  if (isSelected(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
    selectAll.value = false;
  } else {
    selectedCategories.value.push(category);
    selectAll.value = false;
  }

  //console.log("Mandando al padre las categorías...");
  emit('cambiarCategorias', selectedCategories.value);
};

const uncheckAll = () => {
  selectedCategories.value = [];
  emit('cambiarCategorias', selectedCategories.value);
};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
</style>
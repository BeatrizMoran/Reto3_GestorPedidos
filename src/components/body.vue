<template>
  <div class="container-fluid py-2 px-4">
    <div class="row">
      <div v-for="producto in listaFiltrada" :key="producto.id" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div class="card shadow lg-6 card-hover">
          <!-- Contenido de la tarjeta -->
          <!-- Card Top -->
          <div class="card-top bg-gray row justify-content-between align-items-center">
            <div class="col-2 imagen">
              <img src="../assets/duff.png" alt="Imagen de la tarjeta" class="img-fluid" width="100px" height="100px">
            </div>
            <div class="col-10 options d-flex justify-content-between align-items-center">
              <div class="product-info">
                <div class="product-name text-truncate custom-truncate">{{ producto.nombre }}</div>
              </div>
              <button @click="addToCart(producto)" class="btn btn-warning" :disabled="producto.disabled">
                <img src="../assets/carrito.png" alt="Añadir al carrito" class="img-fluid" width="30px" height="30px">
              </button>
            </div>
          </div>
          <!-- Card Body -->
          <div class="card-body bg-light d-flex justify-content-between align-items-center p-2">
            <div class="format">{{ producto.formato }}</div>
            <div class="quantity-section">
              <label for="quantity">Cantidad:</label>
              <input type="number" id="quantity" v-model="producto.selectedQuantity" :disabled="producto.disabled" :min="0" style="width: 50px;">
            </div>
          </div>
          <!-- Card Footer -->
          <div class="card-footer bg-info p-2">
            <div class="details row">
              <div class="price col-6">Precio: {{ producto.precio }} €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center mt-3">
      <button v-if="hasMorePages" @click="loadNextPage" class="btn btn-primary py-2 px-4">Cargar más</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch, defineProps } from 'vue';
import { useProductosStore } from '../stores/productos';

const props = defineProps({
  listaFiltrada: Array,
});

// Variables
const productosStore = useProductosStore();
const productosDisponibles = ref([]);
const terminoBusqueda = ref('');
const listaFiltrada = ref([]);
listaFiltrada.value = inject("listaFiltrada");

// Cargar productos al montar el componente
onMounted(() => {
  console.log("lista filtrada componente", listaFiltrada.value);
});

watch(props.listaFiltrada, async(newValue) => {
  if(newValue){
    console.log(newValue);
  }else{
    console.log("no")
  }
}) ;

// Función para agregar al carrito
const addToCart = (producto) => {
  // lógica para agregar al carrito
};

// Función para cargar más páginas de productos
const loadNextPage = () => {
  // lógica para cargar más páginas
};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
</style>

<template>
  <div class="container-fluid py-2 px-4">
    <div class="row">
      <div v-for="(producto, index) in productosToDisplay" :key="producto.id" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div class="card shadow lg-6  card-hover">
          <!-- Contenido de la tarjeta -->
          <!-- Card Top -->
          <div class="card-top bg-gray row justify-content-between align-items-center ">
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
              <input type="number" id="quantity" v-model="selectedQuantity" :disabled="producto.disabled" :min="0" style="width: 50px;">
            </div>
          </div>
          <!-- Card Footer -->
          <div class="card-footer bg-info  p-2">
            <div class="details row">
              <!-- <div class="category col-6">{{ producto.category }}</div> -->
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
import { useProductosStore } from '../stores/productos'
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';

const PAGE_SIZE = 6;
const productosStore = useProductosStore();
const productosCache = ref([]);
const currentPage = ref(1);
const productosEncontrados = ref([]);
const busqueda = ref('');
const route = useRoute();

onBeforeMount(async () => {
  try {
    if (route.query.nombre) {
      busqueda.value = route.query.nombre;
      
    } else {
      busqueda.value = '';
    }
    await actualizarProductos();
  } catch (error) {
    console.error('Error al cargar los productos:', error.message);
  }
});

const cargarProductos = async () => {
  try {
    await productosStore.cargarProductosDesdeAPI();
    productosCache.value = productosStore.obtenerProductos();
  } catch (error) {
    console.error('Error al cargar los productos:', error.message);
  }
};

const buscarProductos = async () => {
  try {
    productosEncontrados.value = await productosStore.buscarProductos(busqueda.value);
    currentPage.value = 1; // Restablecer la página actual a 1 después de realizar la búsqueda
  } catch (error) {
    console.error('Error al buscar productos:', error.message);
  }
};

const actualizarProductos = async () => {
  if (busqueda.value) {
    await buscarProductos();
  } else {
    await cargarProductos();
  }
};

watch(busqueda, async (newValue) => {
  await actualizarProductos();
});

const productosToDisplay = computed(() => {
  return busqueda.value ? productosEncontrados.value : productosCache.value;
});

const hasMorePages = computed(() => {
  const productos = busqueda.value ? productosEncontrados.value : productosCache.value;
  return (currentPage.value * PAGE_SIZE) < productos.length;
});

const loadNextPage = () => {
  currentPage.value++;
};

const addToCart = (producto) => {
  // Lógica para agregar el producto al carrito
  console.log(`Añadido al carrito: ${producto.nombre}`);
};

</script>

<style lang="scss" scoped>
/* Estilos aquí si es necesario */
</style>
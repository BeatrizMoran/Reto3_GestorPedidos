<template>
  <div class="container-fluid body-container py-4 px-4">
    <div class=" row">
      <div v-for="(producto, index) in paginatedList" :key="producto.id" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div class="card shadow lg-6 card-hover">
          <!-- Contenido de la tarjeta -->
          <!-- Card Top -->
          <div class="card-top bg-gray row justify-content-start align-items-center">
            <div class="col-2 imagen">
              <img :src="producto.imagen" alt="Imagen de la tarjeta" class="img-fluid" >
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
              <div class="price col-12">Precio:{{ producto.precio }}€</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center mt-3" v-if="showNavigation">
      <button @click="previousPage" :disabled="currentPage === 1" class="btn btn-primary py-2 px-4">Página Anterior</button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-primary py-2 px-4">Página Siguiente</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted, onBeforeMount, computed } from 'vue';
import { useProductosStore } from '../stores/productos';

const productosStore = useProductosStore();
const props = defineProps({
  listaProductos: {
    type: Array,
    required: true
  }
});

const list = ref([]);
const pageSize = 6;
let currentPage = ref(1);
const searchTerm = ref('');

onBeforeMount(async () => {
  list.value = await productosStore.cargarProductosDesdeAPI();
});

watch(() => props.listaProductos, (nuevoValor) => {
  list.value = nuevoValor;
});

const paginatedList = computed(() => {
  const filteredList = list.value.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
  const startIndex = (currentPage.value - 1) * pageSize;
  return filteredList.slice(startIndex, startIndex + pageSize);
});

const totalPages = computed(() => {
  const filteredList = list.value.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
  return Math.ceil(filteredList.length / pageSize);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

const showNavigation = computed(() => {
  const filteredList = list.value.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
  return filteredList.length > pageSize;
});

onMounted(() => {
  console.log("montado");
  console.log(list.value);
});
</script>


<style lang="scss" scoped>

@import '../assets/style.scss';

</style>

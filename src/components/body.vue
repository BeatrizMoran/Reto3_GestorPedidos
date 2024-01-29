<template>
  <div class="container-fluid py-2 px-4">
    <div class="row">
      <div v-for="(productosCache, index) in visibleproductosCache" :key="productosCache.id" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div class="card shadow lg-6  card-hover">
          <!-- Contenido de la tarjeta -->

          <!-- Card Top -->
            <div class="card-top bg-gray row justify-content-between align-items-center ">
                <div class="col-2 imagen">
                <img src="../assets/duff.png" alt="Imagen de la tarjeta" class="img-fluid" width="100px" height="100px">
                </div>
                <div class="col-10 options d-flex justify-content-between align-items-center">
                    <div class="product-info">
                        <div class="product-name text-truncate custom-truncate">{{ productosCache.nombre }}</div>
                    </div>
                        <button @click="addToCart(productosCache)" class="btn btn-warning" :disabled="productosCache.disabled">
                            <img src="../assets/carrito.png" alt="Añadir al carrito" class="img-fluid" width="30px" height="30px">
                        </button>
                </div>
            </div>
            <!-- Card Body -->
            <div class="card-body bg-light d-flex justify-content-between align-items-center p-2">
            <div class="format">{{ productosCache.formato }}</div>
            <div class="quantity-section">
                <label for="quantity">Cantidad:</label>
                <input type="number" id="quantity" v-model="selectedQuantity" :disabled="productosCache.disabled" :min="0"  style="width: 50px;">
            </div>
            </div>
    
            <!-- Card Footer -->
            <div class="card-footer bg-info  p-2">
            <div class="details row">
                <!-- <div class="category col-6">{{ productosCache.category }}</div> -->
                <div class="price col-6">Precio: {{ productosCache.precio }} €</div>
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
   import { ref,computed, onBeforeMount} from 'vue';
   const PAGE_SIZE = 6;

   const productosStore = useProductosStore()
    const productosCache = ref([])

onBeforeMount(async () => {
  try {

      await productosStore.cargarProductosDesdeAPI()
      productosCache.value = productosStore.obtenerProductos()
    
  } catch (error) {
    console.error('Error al cargar los productos:', error.message)
  }
})




  const currentPage = ref(1);

const loadNextPage = () => {
  currentPage.value++;
};

const addToCart = (card) => {
  // Lógica para agregar la tarjeta a la lista de compras
  console.log(`Añadido a la lista: ${card.format}`);
};

const visibleproductosCache = computed(() => {
  const startIndex = (currentPage.value - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  return productosCache.value.slice(0, endIndex);
});

const hasMorePages = computed(() => {
  return (currentPage.value * PAGE_SIZE) < productosCache.value.length;
});
</script>
  
<style lang="scss" scoped>

@import '../assets/style.scss';



</style>
  
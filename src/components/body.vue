<template>
  <div class="container-fluid py-2 px-4">
    <div class="row">
      <div v-for="(producto) in productosToDisplay" :key="producto.id" class="col-lg-4 col-md-6 col-sm-12 mb-3">
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
              <input type="number" id="quantity" v-model="producto.selectedQuantity" :disabled="producto.disabled" :min="0" style="width: 50px;">
            </div>
          </div>
          <!-- Card Footer -->
          <div class="card-footer bg-info  p-2">
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
  import { ref, onMounted } from 'vue';
  import { useProductosStore } from '../stores/productos';

  // Variables
  const productosStore = useProductosStore();
  const productosDisponibles = ref([]);
  const productosToDisplay = ref([]);
  const terminoBusqueda = ref('');

  // Función para cargar productos desde la API
  const cargarProductos = async () => {
    try {
      
      const productos = await productosStore.cargarProductosDesdeAPI();
      console.log("productos encontrados", productos);  
      productosDisponibles.value = productos;
      filtrarProductos();
    } catch (error) {
      console.error('Error al cargar productos:', error.message);
    }
  };

  // Función para filtrar productos según el término de búsqueda
  const filtrarProductos = () => {
    if (terminoBusqueda.value === '') {
      console.log("terminoBusqueda",terminoBusqueda.value);
      productosToDisplay.value = productosDisponibles.value;
      console.log("productos filtrados",productosToDisplay.value );
    } else {
      console.log("terminoBusqueda",terminoBusqueda.value);
      productosToDisplay.value = productosDisponibles.value.filter(producto =>
        producto.nombre.toLowerCase().includes(terminoBusqueda.value.toLowerCase())
      );
        console.log("productos filtrados",productosToDisplay.value );
    }
  };

  // Cargar productos al montar el componente
  onMounted(cargarProductos);

  // Función para agregar al carrito
  const addToCart = (producto) => {
    //lógica para agregar al carrito 
  };

  // Función para cargar más páginas de productos
  const loadNextPage = () => {
    //  lógica para cargar más páginas
  };
</script>



<style lang="scss" scoped>
@import '../assets/style.scss';
</style>
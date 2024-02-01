<template>
  <div class="container-fluid body-container py-4 px-4">
    <div class=" row">
      <div v-for="(producto, index) in paginatedList" :key="producto.id" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div class="card shadow lg-6 card-hover">
          <!-- Contenido de la tarjeta -->
          <!-- Card Top -->
          <div class="card-top bg-gray row justify-content-start align-items-center">
            <div class="col-6 imagen">
              <img :src="producto.imagen" alt="I" class="img-fluid" >
            </div>
            <div class="col-6 options d-flex justify-content-between align-items-center">
              <div class="product-info">
                
              </div>
              <button @click="addToCart(producto)" class="btn btn-warning" :disabled="producto.disabled">
                <img src="../assets/carrito.png" alt="Añadir al carrito" class="img-fluid" width="30px" height="30px">
              </button>
            </div>
          </div>
          <div class="nombre col 12">
            <div class="product-name text-truncate custom-truncate">{{ producto.nombre }}</div>
          </div>
          <!-- Card Body -->
          <div class="card-body bg-light d-flex justify-content-between align-items-center p-2">
            
            <div class="format">{{ producto.formato }}</div>
            <div class="quantity-section">
              <label for="quantity">Cantidad:</label>
              <input type="number" id="quantity" v-model="producto.selectedQuantity" :disabled="producto.disabled" :min="1" style="width: 50px;">
            </div>
          </div>
          <!-- Card Footer -->
          <div class="card-footer bg-info p-2">
            <div class="details row">
              <div class="price col-12">Precio:{{ producto.precio }}€</div>
              <div v-for="(cat, index) in producto.categorias" >

                <div class="col-12">Categoria:{{ cat["0"] }}</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center mt-3" v-if="showNavigation">
      <button @click="previousPage" :disabled="currentPage === 1" class="btn btn-primary py-2 px-4">Página Anterior</button>
      <div class="mx-3 paginacion ">Página {{ currentPage }} de {{ totalPages }}</div>
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
  },
  buscador:{
    type: String

  },
  selectedCategories: {
    type: Array,
    default: () => [] 
  }
});


const list = ref([]);


const pageSize = 6;
let currentPage = ref(1);
const searchTerm = ref('');

onBeforeMount(async () => {
  list.value = await productosStore.cargarProductosDesdeAPI();
  console.log("prueba", list.value);
});

watch(() => props.listaProductos, (nuevoValor) => {
  list.value = nuevoValor;
  currentPage.value = 1;
});

watch(() => props.buscador, (nuevoValor) => {
  searchTerm.value = nuevoValor;
  console.log("mierda", searchTerm.value)
});



const paginatedList = computed(() => {
  if (list.value.data !== undefined) {
    // Filtra la lista de productos
    const filteredList = list.value.data.filter(producto => {
      const nombreIncluido = producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase());

      // Verifica si el producto tiene categorías (como un array en la propiedad 'nombre') y si tiene alguna de las categorías seleccionadas
      const tieneCategoriaSeleccionada = Array.isArray(producto.categorias?.nombre) && (props.selectedCategories.length === 0 || props.selectedCategories.some(cat => producto.categorias.nombre.includes(cat)));

      return nombreIncluido && tieneCategoriaSeleccionada;
    });

    // Calcula el número total de páginas basándose en la lista filtrada
    const totalFilteredPages = Math.ceil(filteredList.length / pageSize);

    // Asigna el valor correcto de totalPages
    totalPages.value = totalFilteredPages > 0 ? totalFilteredPages : 1;

    // Muestra todos los productos en una página si hay menos de pageSize elementos
    if (filteredList.length <= pageSize) {
      return filteredList;
    }

    // Calcula el índice de inicio y fin para la paginación
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return filteredList.slice(startIndex, endIndex);
  }
});

// Calcula el total de páginas basándose en la lista filtrada
const totalPages = computed(() => {
  if (list.value.data !== undefined) {
    const filteredList = list.value.data.filter(producto => {
      const nombreIncluido = producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase());
      const tieneCategoriaSeleccionada = Array.isArray(producto.categorias?.nombre) && (props.selectedCategories.length === 0 || props.selectedCategories.some(cat => producto.categorias.nombre.includes(cat)));
      
      return nombreIncluido && tieneCategoriaSeleccionada;
    });

    const totalFilteredPages = Math.ceil(filteredList.length / pageSize);

    // Retorna el número total de páginas basándose en la lista filtrada y en la cantidad de elementos después de aplicar los filtros
    return totalFilteredPages > 0 ? totalFilteredPages : 1;
  }

  // En caso de que la lista no esté definida, retorna 1 página
  return 1;
});


// Muestra la navegación entre páginas solo si hay más de una página
const showNavigation = computed(() => totalPages.value > 1);

// Función para ir a la página siguiente
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

// Función para ir a la página anterior
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
onMounted(() => {
  console.log("montado");
  console.log(list.value);
});


function addToCart(producto) {
  // Obtener el carrito del localStorage o crear uno nuevo si no existe
  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  // Verificar si el producto ya está en el carrito
  if (cart[producto.id]) {
    // Si el producto ya está en el carrito, aumentar la cantidad
    cart[producto.id].cantidad += producto.selectedQuantity;
  } else {
    // Si el producto no está en el carrito, agregarlo con su cantidad
    cart[producto.id] = {
      nombre: producto.nombre,
      cantidad: producto.selectedQuantity,
      precio: producto.precio
    };
  }

  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Reiniciar la cantidad seleccionada del producto a 1
  producto.selectedQuantity = 1;
}


</script>


<style lang="scss" scoped>

@import '../assets/style.scss';

</style>
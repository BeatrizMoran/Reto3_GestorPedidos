<template>
  <div class="body-container py-4 px-4">

    <!-- Alerta Guardado Correctamente -->
    <div class="row d-flex justify-content-center">
      <div v-if="showAlert" class="alert alert-success col-6 " role="alert">
        {{ alertMessage }}
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 my-5">
        <div class="d-flex justify-content-end align-items-center">
          <div class="text-center">
            <button class="btn btn-primary" :disabled="isButtonDisabled" @click="redirectToComprarPedido">Comprar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido de la tarjeta -->
    <div class=" row">
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3" v-for="(producto, index) in paginatedList" :key="producto.id">
        <div class="card lg-6 card-hover">


          <!-- Card Top -->
          <div class=" card-top uno justify-content-start align-items-center">
            <div class="col-12 px-2 shadow">
              <img :src="producto.imagen" alt="I" class="img-fluid imagen">
            </div>
            <div class="col-12 px-2">
              <button @click="addToCart(producto)" class="btn options " :disabled="producto.disabled"
                v-if="clienteEnLocalStorage">
                <img src="../assets/carrito.png" alt="Añadir al carrito" class="img-fluid" width="30px" height="30px">
              </button>
            </div>
            <div class="info-name text-truncate custom-truncate"> {{ producto.nombre }}</div>
          </div>

          <!-- Card Body -->
          <div class="card-body dos d-flex justify-content-between align-items-center p-2">
            <div class="format price">{{ producto.formato }}</div>
            <div class="quantity-section" v-if="clienteEnLocalStorage">
              <label for="quantity"><b class="border-bottom">Cantidad: </b></label>
              <input type="number" id="quantity" v-model="producto.selectedQuantity" :disabled="producto.disabled" :min="1" style="width: 50px;">
            </div>
          </div>

          <!-- Card Footer -->
          <div class="card-footer bg-info p-2">
            <div class="details ">
              <div class="price col-12"><b class="border-bottom border-black">Precio: </b>{{ producto.precio }}€</div>
              <div v-if="producto.categorias.nombre.length > 0" class="mb-3">
                <label for="categorias" class="form-label price"><b class="border-bottom border-black">Categoria: </b></label>
                <select id="categorias" class="form-select" multiple size="2" >
                  <option v-for="(cat, index) in producto.categorias.nombre" :key="index" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>



            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Botones Paginacion -->

    <div class=" row d-flex justify-content-center align-items-center mt-3" v-if="showNavigation">
      <button @click="previousPage" :disabled="currentPage === 1"
        class="col-lg-3 col-md-5 col-sm-12 btn btn-primary py-2 px-4  mx-2 my-4">Página Anterior</button>
      <div class="col-lg-3 col-md-5 col-sm-12 btn mx-2 my-4 paginacion  ">Página {{ currentPage }} de {{ totalPages }}
      </div>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class=" col-lg-3 col-md-5 col-sm-12 btn btn btn-primary py-2 px-4 mx-2 my-4">Página Siguiente</button>
    </div>





  </div>
</template>


<script setup>
//imports
import { ref, watch, defineProps, onMounted, onBeforeMount, computed } from 'vue';
import { useProductosStore } from '../stores/productos';
import { useRouter } from 'vue-router';

//variables
const productosStore = useProductosStore();
const alertMessage = ref();
const showAlert = ref();
const list = ref([]);
const showButton = ref(false);
const isButtonDisabled = ref(true);
const pageSize = 6;
let currentPage = ref(1);
const searchTerm = ref('');
const router = useRouter();


//cliente logueado
const clienteAlmacenado = localStorage.getItem("cliente");
const clienteEnLocalStorage = ref(JSON.parse(clienteAlmacenado));

//datos recibidos del padre
const props = defineProps({
  listaProductos: {
    type: Array,
    required: true
  },
  buscador: {
    type: String

  },
  selectedCategories: {
    type: Array,
    default: () => []
  }
});

//antesdemontar
onBeforeMount(async () => {
  list.value = await productosStore.cargarProductosDesdeAPI();
  //console.log("onbeforemount", list.value);

});

//watchs

// Watch para actualizar clienteEnLocalStorage instantáneamente
watch(clienteEnLocalStorage, (nuevoCliente) => {
  clienteEnLocalStorage.value = nuevoCliente;
});

watch(() => props.listaProductos, (nuevoValor) => {
  list.value = nuevoValor;
  currentPage.value = 1;

});

watch(() => props.buscador, (nuevoValor) => {
  searchTerm.value = nuevoValor;

  //console.log("nuevoValor",nuevoValor);
  //console.log("watchbuscador", searchTerm.value);
});



const paginatedList = computed(() => {
  if (list.value.data !== undefined) {
    // Filtra la lista de productos
    const filteredList = list.value.data.filter(producto => {
      const nombreIncluido = producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase());

      // Verifica si el producto tiene categorias (como un array en la propiedad 'nombre') y si tiene alguna de las categorias seleccionadas
      const tieneCategoriaSeleccionada = Array.isArray(producto.categorias?.nombre) && (props.selectedCategories.length === 0 || props.selectedCategories.some(cat => producto.categorias.nombre.includes(cat)));

      return nombreIncluido && tieneCategoriaSeleccionada;
    });

    // Calcula el numero total de páginas basándose en la lista filtrada
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
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
}

// Función para ir a la página anterior
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
}

//almontar
onMounted(() => {
  //console.log("Categorías recibidas en Body.vue:", props.selectedCategories);
  //console.log("Productos recibidos en Body.vue:", list.value);
  //console.log("montado");
  //console.log(list.value);
  updateButtonState();

});

//añadimos la carta seleccionada al localstorage
function addToCart(producto) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};


  if (!producto.selectedQuantity || producto.selectedQuantity < 1) {
    producto.selectedQuantity = 1;
  }

  if (!cart[producto.id]) {
    cart[producto.id] = {
      nombre: producto.nombre,
      cantidad: producto.selectedQuantity,
      precio: producto.precio,
      imagen: producto.imagen,
      id: producto.id,
      cliente_id: clienteEnLocalStorage.value.id
    };
  } else {
    cart[producto.id].cantidad += producto.selectedQuantity;
  }

  localStorage.setItem('cart', JSON.stringify(cart));


  // Mostrar mensaje de alerta
  showAlert.value = true;
  alertMessage.value = `${producto.nombre} se ha añadido a la cesta correctamente.`;

  // Ocultar el mensaje después de unos segundos
  setTimeout(() => {
    showAlert.value = false;
    alertMessage.value = '';
  }, 3000); // 3000 milisegundos = 3 segundos
  window.scrollTo({ top: 100, behavior: 'smooth' });


  // Actualizar el estado del botón después de agregar un producto al carrito
  updateButtonState();

  producto.selectedQuantity = 1;
}

// Función para verificar y actualizar el estado del botón
function updateButtonState() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  isButtonDisabled.value = Object.keys(cart).length === 0;
}


function redirectToComprarPedido() {
  router.push({ name: 'cart' });
}

</script>


<style lang="scss" scoped>
@import '../assets/style.scss';
</style>


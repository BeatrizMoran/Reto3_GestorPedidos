<template>
  <div class="body-container py-4 px-4">
    <!-- Alerta Guardado Correctamente -->
    <div class="row d-flex justify-content-center">
      <div v-if="showAlert" class="alert alert-success col-6" role="alert">
        {{ alertMessage }}
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 my-5">
        <div class="d-flex justify-content-end align-items-center">
          <div class="text-center">
            <button
              class="btn btn-primary"
              :disabled="isButtonDisabled"
              @click="redirectToComprarPedido"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido de la tarjeta -->
    <div class="row">
      <div
        class="col-lg-4 col-md-6 col-sm-12 mb-3"
        v-for="producto in paginatedProductos"
        :key="producto.id"
      >
        <div class="card lg-6 card-hover">
          <!-- Card Top -->
          <div class="card-top bg-gray justify-content-start align-items-center">
            <div class="col-12 px-2 shadow">
              <img
                :src="'https://javieregibide.com/storage/' + producto.imagen"
                alt="Producto"
                class="img-fluid imagen"
              />
            </div>
            <div class="col-12 px-2">
              <button
                @click="addToCart(producto)"
                class="btn options"
                :disabled="producto.disabled"
                v-if="clienteEnLocalStorage"
              >
                <img
                  src="../assets/images/carrito.png"
                  alt="Añadir al carrito"
                  class="img-fluid"
                  width="30px"
                  height="30px"
                />
              </button>
            </div>
            <div class="info-name text-truncate custom-truncate">{{ producto.nombre }}</div>
          </div>

          <!-- Card Body -->
          <div class="card-body bg-light d-flex justify-content-between align-items-center p-2">
            <div class="format">{{ producto.formato }}</div>
            <div class="quantity-section" v-if="clienteEnLocalStorage">
              <label for="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                v-model="producto.selectedQuantity"
                :disabled="producto.disabled"
                :min="1"
                style="width: 50px"
              />
            </div>
          </div>

          <!-- Card Footer -->
          <div class="card-footer bg-info p-2">
            <div class="details">
              <div class="price col-12">Precio:{{ producto.precio }}€</div>

              <label for="categorias" class="form-label">Categorías:</label>
              <select id="categorias" class="form-select" multiple size="2">
                <option v-for="categoria in producto.categorias" :key="categoria.id">
                  {{ categoria.nombre }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones Paginacion -->

    <div class="row d-flex justify-content-center align-items-center mt-3">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="col-lg-3 col-md-5 col-sm-12 btn btn-primary py-2 px-4 mx-2 my-4"
      >
        Página Anterior
      </button>
      <div class="col-lg-3 col-md-5 col-sm-12 btn mx-2 my-4 paginacion">
        Página {{ currentPage }} de {{ totalPages }}
      </div>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="col-lg-3 col-md-5 col-sm-12 btn btn btn-primary py-2 px-4 mx-2 my-4"
      >
        Página Siguiente
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onBeforeMount, computed } from 'vue'
import { useProductosStore } from '../stores/productos'
import { useRouter } from 'vue-router'

const productosStore = useProductosStore()
const alertMessage = ref()
const showAlert = ref()
const listaProductos = ref([])
const showButton = ref(false)
const isButtonDisabled = ref(true)
let currentPage = ref(1)
const router = useRouter()
const clienteAlmacenado = localStorage.getItem('cliente')
const clienteEnLocalStorage = ref(JSON.parse(clienteAlmacenado))

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
})

onBeforeMount(async () => {
  listaProductos.value = await productosStore.cargarProductosDesdeAPI()
  console.log('onbefore', listaProductos.value.productos)
})

watch(clienteEnLocalStorage, (nuevoCliente) => {
  clienteEnLocalStorage.value = nuevoCliente
})

watch(
  () => props.listaProductos,
  (nuevoValor) => {
    console.log('nuevo valor', nuevoValor.productos)
    listaProductos.value = nuevoValor
    currentPage.value = 1
  }
)

const searchTerm = ref(props.buscador || '') // Inicializa con el valor actual

const filteredProductos = computed(() => {
  const productos = listaProductos.value.productos

  if (!productos) {
    return [] // O cualquier valor predeterminado que desees
  }

  const productosFiltrados = productos.filter((producto) => {
    // Filtro por categorías
    const categoriasCoinciden =
      props.selectedCategories.length === 0 ||
      producto.categorias.some((pCat) => {
        return props.selectedCategories.includes(pCat.nombre)
      })

    // Filtro por nombre del buscador
    const nombreCoincide =
      !searchTerm.value ||
      (producto.nombre && producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()))

    // Seleccionar productos que cumplen con al menos uno de los filtros
    return categoriasCoinciden && nombreCoincide
  })

  return productosFiltrados
})

const pageSize = 6

// Cálculo de los productos de la página actual
const paginatedProductos = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredProductos.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProductos.value.length / pageSize)
})

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}

//añadimos la carta seleccionada al localstorage
function addToCart(producto) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {}

  if (!producto.selectedQuantity || producto.selectedQuantity < 1) {
    producto.selectedQuantity = 1
  }

  if (!cart[producto.id]) {
    cart[producto.id] = {
      nombre: producto.nombre,
      cantidad: producto.selectedQuantity,
      precio: producto.precio,
      imagen: producto.imagen,
      id: producto.id,
      cliente_id: clienteEnLocalStorage.value.id
    }
  } else {
    cart[producto.id].cantidad += producto.selectedQuantity
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  // Mostrar mensaje de alerta
  showAlert.value = true
  alertMessage.value = `${producto.nombre} se ha añadido a la cesta correctamente.`

  // Ocultar el mensaje después de unos segundos
  setTimeout(() => {
    showAlert.value = false
    alertMessage.value = ''
  }, 3000) // 3000 milisegundos = 3 segundos
  window.scrollTo({ top: 100, behavior: 'smooth' })

  // Actualizar el estado del botón después de agregar un producto al carrito
  updateButtonState()

  producto.selectedQuantity = 1
}

// Función para verificar y actualizar el estado del botón
function updateButtonState() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {}
  isButtonDisabled.value = Object.keys(cart).length === 0
}

function redirectToComprarPedido() {
  router.push({ name: 'cart' })
}
</script>

<style scoped></style>

<template>
    <div class="row">
        <div class="col-8">
            <p class="p-3 rounded-3 carrito-color">
                <img src="../assets/carrito.png" alt="Añadir al carrito" class="img-fluid" width="30px" height="30px" />
                Carrito ({{ listaCompra.length }} artículos)
            </p>
            <div class="row d-flex justify-content-center">
                <div v-if="showAlert" class="alert alert-success col-6 " role="alert">
                    {{ alertMessage }}
                </div>
            </div>

            <div class="row my-3 px-2 border-top border-bottom border-gray shadow p-3 rounded-3 tarjetitas" 
                v-for="(producto, key) in listaCompra" :key="key">
                <div v-if="producto.cliente_id === cliente.id">
                    <div class="imagen col-3 px-2 py-2">
                        <img :src="getImageUrl(producto.imagen)" alt="Imagen del producto" class="img-fluid me-md-3 mb-3" />
                    </div>
                    <div class="col-12 mx-3 d-flex justify-content-center align-items-end flex-column px-4">
                        <p>{{ producto.nombre }}</p>
                        <p class="border-bottom"><b>Cantidad:</b> {{ producto.cantidad }}</p>
                        <p class="custom-border-dashed ">
                            <span class="d-inline-block bg-success text-white rounded-circle p-2 me-2"></span>Disponible
                            para envío inmediato
                        </p>
                        <p><b class=" border-bottom border-gray">Precio por unidad:</b> {{ producto.precio }}€</p>

                        <!-- Nuevo párrafo para mostrar el precio total -->
                        <p><b class=" border-bottom border-gray">Precio total:</b> {{ producto.precio * producto.cantidad }}€</p>
                    </div>

                    <div class="col-3 d-flex flex-column justify-content-center align-items-center">
                        <button @click="feliminarProducto(producto.id)" class="my-2 btn btn-danger d-inline">
                            Eliminar
                        </button>
                        <button type="button" class="btn btn-primary" @click="editarProducto(producto.id)">
                            Editar
                        </button>
                        <div v-if="idProductoSeleccionado !== null && idProductoSeleccionado === producto.id">
                            <AsyncPage @indicarUnidades="guardarCantidad" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Resumen del Pedido</h5>

                    <!-- Subtotal del pedido -->
                    <div class="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>{{ calcularSubtotal() }}€</span>
                    </div>

                    <!-- Importe del envío -->
                    <div class="d-flex justify-content-between">
                        <span>Importe del Envío:</span>
                        <span>4,50€</span>
                    </div>

                    <!-- Total del importe -->
                    <div class="d-flex justify-content-between">
                        <span>Total Importe:</span>
                        <span>{{ calcularTotal() }}€</span>
                    </div>

                    <!-- Botón de realizar compra -->
                    <button class="btn btn-primary mt-3" @click="frealizarCompra">Realizar Compra</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, defineAsyncComponent } from 'vue'
import { usePedidosStore } from '../stores/pedidos'

const AsyncPage = defineAsyncComponent(() => import('./indicarCantidad.vue'))
const idProductoSeleccionado = ref(null) // Variable reactiva para almacenar el ID del producto seleccionado

function editarProducto(idProducto) {
    // Establece el ID del producto seleccionado en la variable reactiva
    idProductoSeleccionado.value = idProducto
    console.log(idProductoSeleccionado.value)

}
const pedidosStore = usePedidosStore()


const mostrarListaCompra = ref(false)

// Lista de compra
const lista = ref()
const listaCompra = ref([])
const clienteAlmacenado = localStorage.getItem('cliente')
const cliente = JSON.parse(clienteAlmacenado)

const alertMessage = ref();
const showAlert = ref();

async function frealizarCompra() {
    try {
        const clienteAlmacenado = localStorage.getItem('cliente')
        const cliente = JSON.parse(clienteAlmacenado)

        const productos = listaCompra.value.map((producto) => {
            return {
                id: producto.id,
                cantidad: producto.cantidad
            }
        })

        const pedido = {
            estado: 'solicitado',
            total: calcularTotal(),
            cliente_id: cliente.id,
            productos: productos
        }

        const response = await pedidosStore.crearPedido(pedido)
        console.log('Respuesta del servidor al realizar la compra:', response)

        // Limpiar el carrito después de realizar la compra
        const carritoActual = JSON.parse(localStorage.getItem('cart')) || {}
        const nuevoCarrito = {}

        // Filtrar los productos que no pertenecen al cliente logueado
        Object.keys(carritoActual).forEach((key) => {
            const producto = carritoActual[key]
            if (producto.cliente_id !== cliente.id) {
                nuevoCarrito[key] = producto
            }
        })

        localStorage.setItem('cart', JSON.stringify(nuevoCarrito))
        listaCompra.value = Object.values(nuevoCarrito)



        //mensaje 
        showAlert.value = true;
        alertMessage.value = `pedido realizado correctamente`;

        setTimeout(() => {
            showAlert.value = false;
            alertMessage.value = '';
        }, 3000);

    } catch (error) {
        console.error('Error al realizar la compra:', error.message)
    }
}

onBeforeMount(async () => {
    try {
        // Lista de compra
        lista.value = localStorage.getItem('cart')
        listaCompra.value = Object.values(JSON.parse(lista.value) || {})

        // Verifica si el cliente_id coincide con el cliente logueado
        const clienteAlmacenado = localStorage.getItem('cliente')
        const cliente = JSON.parse(clienteAlmacenado)

        // Filtra los productos que pertenecen al cliente logueado
        listaCompra.value = listaCompra.value.filter((producto) => producto.cliente_id === cliente.id)

        mostrarListaCompra.value = cliente && listaCompra.value.length > 0
    } catch (error) {
        console.error('Error al cargar la lista de la compra:', error)
    }
})

function feliminarProducto(idProducto) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {}

    delete cart[idProducto]

    localStorage.setItem('cart', JSON.stringify(cart))

    listaCompra.value = Object.values(cart)
}

function calcularSubtotal() {
    return listaCompra.value
        .reduce((subtotal, producto) => {
            return subtotal + producto.precio * producto.cantidad
        }, 0)
        .toFixed(2)
}

function calcularTotal() {
    const subtotal = calcularSubtotal()
    const envio = 4.5
    return (parseFloat(subtotal) + envio).toFixed(2)
}
//editar cantidad

function guardarCantidad(cant) {
    // Encuentra el índice del producto seleccionado en la listaCompra
    const index = listaCompra.value.findIndex(
        (producto) => producto.id === idProductoSeleccionado.value
    )
    console.log(listaCompra.value)

    if (index !== -1) {
        // Actualiza la cantidad en la listaCompra
        listaCompra.value[index].cantidad = cant

        // Actualiza el localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || {}
        cart[idProductoSeleccionado.value] = { ...listaCompra.value[index] }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}
</script>

<script>
export default {
    methods: {
        getImageUrl(imagen) {
            return 'http://localhost/api/images/' + imagen
        }
    }
}
</script>

<style lang="scss" scoped>
.imagen img {
    height: 160px;
    width: 150px;
}

@import '../assets/style.scss';
</style>

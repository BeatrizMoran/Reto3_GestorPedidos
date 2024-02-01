<template>
    <div class="row">
        <div class="col-8" >
            <p style="background-color: rgba(176, 203, 226, 0.884);" class="p-3 rounded-3"><img src="../assets/carrito.png" alt="Añadir al carrito" class="img-fluid" width="30px" height="30px" > Carrito ({{ listaCompra.length }} artículos)</p>

            <div class="row my-3 px-2 border-top border-bottom border-gray shadow p-3 rounded-3" v-for="(producto, key) in listaCompra" :key="key" style="background-color: rgba(73, 72, 72, 0.637);">
                
                <div class="imagen col-3 px-2 py-2"  >
                    <img :src="getImageUrl(producto.imagen)" alt="Imagen del producto" class="img-fluid me-md-3 mb-3">
                </div>
                <div class="col-5 mx-3  d-flex justify-content-center align-items-start flex-column" >
                    <p>{{ producto.nombre }}</p>
                    <p><b>Cantidad:</b> {{ producto.cantidad }}</p>
                    <p><span class="d-inline-block bg-success text-white rounded-circle p-2 me-2"></span>Disponible para envío inmediato</p>
                    <p><b>Precio por unidad:</b> {{ producto.precio }}€</p>
                    
                    <!-- Nuevo párrafo para mostrar el precio total -->
                    <p><b>Precio total:</b> {{ producto.precio * producto.cantidad }}€</p>                </div>
     
                <div class="col-3 d-flex justify-content-center align-items-center" >
                    <button @click="feliminarProducto(producto.id)" class="my-2 btn btn-danger">Eliminar</button>
                    <button @click="feditarCantidad(producto.id)" class=" btn btn-warning">Editar</button>

                </div>
            </div>
         
            
        </div>
        <div class="col-4" >
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
  
  
  
<style lang="scss" scoped>
@import '../assets/style.scss';
</style>
  

<script setup>
import { ref, onBeforeMount } from 'vue';
import { usePedidosStore } from "../stores/pedidos";

const pedidosStore = usePedidosStore();

// Lista de compra
const lista = ref();
const listaCompra = ref([]);

async function frealizarCompra() {
    try {
        const clienteAlmacenado = localStorage.getItem("cliente");
        const cliente = JSON.parse(clienteAlmacenado);

        const productos = listaCompra.value.map(producto => {
            return {
                id: producto.id,
                cantidad: producto.cantidad
            };
        });

        const pedido = {
            estado: "solicitado",
            total: calcularTotal(),
            cliente_id: cliente.id,
            productos: productos
        };

        const response = await pedidosStore.crearPedido(pedido);
        console.log("Respuesta del servidor al realizar la compra:", response);

        // Limpiar el carrito después de realizar la compra
        localStorage.removeItem("cart");
        listaCompra.value = [];

    } catch (error) {
        console.error("Error al realizar la compra:", error.message);
    }
}

onBeforeMount(async () => {
    try {
        // Lista de compra
        lista.value = localStorage.getItem("cart");
        // Parsear y obtener los valores del objeto
        listaCompra.value = Object.values(JSON.parse(lista.value) || {});
        console.log("Lista de la compra:", listaCompra.value);
    } catch (error) {
        console.error("Error al cargar la lista de la compra:", error);
    }
});

function feliminarProducto(idProducto) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    delete cart[idProducto];

    localStorage.setItem('cart', JSON.stringify(cart));

    listaCompra.value = Object.values(cart);
}


function calcularSubtotal (){
  return listaCompra.value.reduce((subtotal, producto) => {
    return subtotal + producto.precio * producto.cantidad;
  }, 0);
};

function  calcularTotal (){
  return calcularSubtotal() + 4.50; // Importe del envío fijo de 4,50€
};

</script>
  

  
<script>
export default {
    methods: {
        getImageUrl(imagen) {
            return 'http://localhost/api/images/' + imagen;
        }
    }
}
</script>
  
<style lang="scss" scoped>
.imagen img{
    height: 160px;
    width: 150px;
  }
@import '../assets/style.scss';
</style>
  
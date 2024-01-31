<template>
  <div class="container-fluid">
    <div class="row">
      <h1 class="mt-4 mb-4">Listado de Pedidos</h1>
      <table class="table table-responsive">
        <thead class="bg-dark">
          <tr>
            <th>Total</th>
            <th>Fecha del pedido</th>
            <th>Número de pedido</th>
            <th>Estado</th>

            <th>Ver Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pedido, index) in pedidos" :key="index" :style="{ backgroundColor: getColor(pedido.estado) }">
            <td>{{ pedido.total }} €</td>
            <td>{{ pedido.fecha_pedido }}</td>
            <td>{{ pedido.numero_pedido }}</td>
            <td  :style="{ backgroundColor: getColor(pedido.estado) }" class="text-white">
              {{ pedido.estado }}
            </td>
            <td>
              <button @click="mostrarDetallesPedido(pedido)" class="btn btn-link p-0">
                <img src="../assets/ver.png" alt="Ver detalles" class="img-fluid" id="imgDetalles">
              </button>
            </td>
          </tr>
          <tr v-if="pedidoSeleccionado">
            <td colspan="5">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">Producto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="row">
                        <div v-for="(producto, prodIndex) in pedidoSeleccionado.productos" :key="prodIndex" class="col-md-4 mb-3">
                          <div class="d-flex flex-column align-items-center p-3 border rounded shadow-sm shadow-md-lg">
                            <img :src="getImageUrl(producto.imagen)" alt="Imagen del producto" class="img-fluid me-md-3 mb-3">
                            <div class="text-center">
                              <p class="mb-1  "><span class="fw-bold fs-5 text-secondary">Nombre:</span> {{ producto.precio }} €</p>
                              <p class="mb-1  "><span class="fw-bold">Precio:</span> {{ producto.precio }} €</p>
                              <p class="mb-1  "><span class="fw-bold ">Cantidad:</span> {{ producto.cantidad }} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>


            </td>
          </tr>
         
        </tbody>
      </table>
    </div>
  </div>
</template>



<style lang="scss" scoped>

@import '../assets/style.scss';

  </style>

<script setup>
import { onBeforeMount, ref } from 'vue';
import detallesPedido from './detallesPedido.vue';
import { usePedidosStore } from "../stores/pedidos";

const pedidosStore = usePedidosStore();
const pedidos = ref([]);
const clienteAlmacenado = localStorage.getItem("cliente");
const objCliente = JSON.parse(clienteAlmacenado);
const pedidoSeleccionado = ref(null);

onBeforeMount(async () => {
  try {
    const response = await pedidosStore.buscarPedidosCliente(objCliente.id);
    pedidos.value = response.data;
    console.log("lista pedidos:", pedidos.value);
  } catch (error) {
    console.error("Error al cargar los pedidos:", error);
  }
});

const getColor = (estado) => {
  switch (estado) {
    case 'solicitado':
      return 'var(--solicitado-color)';
    case 'en preparacion':
      return 'var(--preparacion-color)';
    case 'en entrega':
      return 'var(--entrega-color)';
    case 'entregado':
      return 'var(--entregado-color)';
    default:
      return 'var(--default-color)';
  }
};

const mostrarDetallesPedido = (pedido) => {
  pedidoSeleccionado.value = pedido;
};

const cerrarDetallesPedido = () => {
  pedidoSeleccionado.value = null;
};



</script>

<script>
export default {
  methods: {
    getImageUrl(imagen) {
      // Utiliza la URL de la API Laravel para acceder a las imágenes
      return 'http://localhost/api/images/' + imagen;
    }
  }
}
</script>
<style lang="scss" scoped>
  img{
    height: 160px;
    width: 150px;
  }

  #imgDetalles{
    width: 50px;
    height: 50px;
  }
</style>

<style lang="scss" scoped>

@import '../assets/style.scss';

  </style>

<template>
  <div class="row">
    <div class="col perfil-container p-5">
      <h1 class="mt-4 mb-4 text-secundary text-light">Listado de Pedidos</h1>
      <div class="table-responsive">
        <table class="table">
          <thead class="bg-dark">
            <tr>
              <th>Total</th>
              <th>Fecha del pedido</th>
              <th>Número de pedido</th>
              <th>Estado</th>

              <th class="text-center">Ver Detalles</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pedido, index) in pedidos"
              :key="index"
              :style="{ backgroundColor: getColor(pedido.estado) }"
            >
              <td class="uno price hoverPedidos">{{ pedido.total }} €</td>
              <td class="uno price hoverPedidos">{{ pedido.fecha_pedido }}</td>
              <td class="uno price hoverPedidos">{{ pedido.numero_pedido }}</td>
              <td
                :style="{ backgroundColor: getColor(pedido.estado) }"
                class="text-white price cuidado"
              >
                {{ pedido.estado }}
              </td>
              <td class="uno price hoverPedidos text-center">
                <button @click="mostrarDetallesPedido(pedido)" class="btn btn-link p-0">
                  <img
                    src="../assets/images/ver.png"
                    alt="Ver detalles"
                    class="img-fluid"
                    id="imgDetalles"
                  />
                </button>
              </td>
            </tr>
            <tr v-if="pedidoSeleccionado">
              <td colspan="5 ">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th class="text-center dos price">Productos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="row grisPedido p-4">
                          <div
                            v-for="(producto, prodIndex) in pedidoSeleccionado.productos"
                            :key="prodIndex"
                            class="col-md-4 mb-3"
                          >
                            <div
                              class="d-flex flex-column align-items-center p-3 border rounded shadow-lg shadow-md-lg bg-light hovimg"
                            >
                              <img
                              :src="`${link}/storage/${producto.imagen}`"
                                alt="Imagen del producto"
                                class="img-fluid me-md-3 mb-3"
                              />
                              <div class="text-center">
                                <p class="mb-1">
                                  <span class="fw-bold fs-5 text-secondary">Nombre:</span>
                                  {{ producto.nombre }}
                                </p>
                                <p class="mb-1">
                                  <span class="fw-bold">Precio:</span> {{ producto.precio }} €
                                </p>
                                <p class="mb-1">
                                  <span class="fw-bold">Cantidad:</span> {{ producto.cantidad }}
                                </p>
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
  </div>
</template>

<script setup>
//url api
const link = 'https://reto3-losjavas.onrender.com/api';

//imports
import { onBeforeMount, ref } from 'vue'
//import detallesPedido from './detallesPedido.vue';
import { usePedidosStore } from '../stores/pedidos'

//variables
const pedidosStore = usePedidosStore()
const pedidos = ref([])
const clienteAlmacenado = localStorage.getItem('cliente')
const objCliente = JSON.parse(clienteAlmacenado)
const pedidoSeleccionado = ref(null)


//antes de montar
onBeforeMount(async () => {
  try {
    const response = await pedidosStore.buscarPedidosCliente(objCliente.id)
    pedidos.value = response.data
  } catch (error) {
    console.error('Error al cargar los pedidos:', error)
  }
})

//rellenar del color diferenciando el estado
const getColor = (estado) => {
  switch (estado) {
    case 'solicitado':
      return 'var(--solicitado-color)'
    case 'en preparacion':
      return 'var(--preparacion-color)'
    case 'en entrega':
      return 'var(--entrega-color)'
    case 'entregado':
      return 'var(--entregado-color)'
    default:
      return 'var(--default-color)'
  }
}

//mostrar detalles pedido modal
const mostrarDetallesPedido = (pedido) => {
  pedidoSeleccionado.value = pedido
}

//cerrar detalles pedido modal
const cerrarDetallesPedido = () => {
  pedidoSeleccionado.value = null
}
</script>

<style lang="scss" scoped>
img {
  height: 160px;
  width: 150px;
}

#imgDetalles {
  width: 50px;
  height: 50px;
}
</style>



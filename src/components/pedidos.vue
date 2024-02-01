<template>
    <div class="container-fluid ">
      <div class="row ">
        <div class="col ">
          <h1>Listado de Pedidos</h1>
          <table class="table ">
            <thead>
              <tr>
                <th>Número de Pedido</th>
                <th>Fecha de Creación</th>
                <th>Estado</th>
                <th>Ver Detalles</th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="(pedido, index) in pedidos" :key="index" :style="{ backgroundColor: getColor(pedido.estado) }">
                <td>{{ 'Pedido ' + (index + 1) }}</td>
                <td>{{ pedido.fechaCreacion }}</td>
                <td :style="{ backgroundColor: getColor(pedido.estado) }">{{ pedido.estado }}</td>
                <td>
                  <button @click="mostrarDetallesPedido(pedido)" class="btn btn-link p-0">
                    <img src="../assets/ver.png" alt="Ver detalles" class="img-fluid" style="max-width: 20px;">
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
           <!-- Mostrar detallesPedido solo cuando pedidoSeleccionado no sea null -->
           <detallesPedido :pedido="pedidoSeleccionado" @cerrar="cerrarDetallesPedido" />>


        </div>
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

  // Datos de ejemplo para los pedidos

  const clienteAlmacenado = localStorage.getItem("cliente");

// Convertir la cadena JSON a un objeto JavaScript
const objCliente = JSON.parse(clienteAlmacenado);



  onBeforeMount(async () => {
    pedidos.value = await pedidosStore.buscarPedidosCliente(objCliente.id);
});
  // Estado del pedido seleccionado para mostrar detalles en la ventana emergente
  const pedidoSeleccionado = ref(null);
  
 // Método para obtener el color del estado del pedido
const getColor = (estado) => {
  try {
    switch (estado) {
      case 'Solicitado':
        return 'var(--solicitado-color)';
      case 'En preparación':
        return 'var(--preparacion-color)';
      case 'En entrega':
        return 'var(--entrega-color)';
      case 'Entregado':
        return 'var(--entregado-color)';
      default:
        return 'var(--default-color)';
  }
  } 
  catch (error) {
    alert(error);
  }

};
  
  const mostrarDetallesPedido = (pedido) => {
    try {
      pedidoSeleccionado.value = pedido;
    } 
    catch (error) {
      alert(error);
    }

  };
  
// Función para cerrar los detalles del pedido y ocultar el componente detallesPedido
const cerrarDetallesPedido = () => {
  try {
    pedidoSeleccionado.value = null;
  } 
  catch (error) {
    alert(error);
  }

};
  </script>
  
  <style lang="scss" scoped>

@import '../assets/style.scss';

  </style>

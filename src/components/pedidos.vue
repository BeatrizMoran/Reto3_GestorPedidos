<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1>Listado de Pedidos</h1>
          <table class="table">
            <thead>
              <tr>
                <th>Número de Pedido</th>
                <th>Fecha de Creación</th>
                <th>Estado</th>
                <th>Ver Detalles</th>
              </tr>
            </thead>
            <tbody>
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
  
  <script setup>
  import { ref } from 'vue';
  import detallesPedido from './detallesPedido.vue';
  
  // Datos de ejemplo para los pedidos
  const pedidos = ref([
    {
      fechaCreacion: '2023-01-01',
      estado: 'Solicitado',
      productos: [
        { nombre: 'Camiseta', formato: 'Talla M', cantidad: 2, precio: 12.99 },
        { nombre: 'Pantalones', formato: 'Talla L', cantidad: 1, precio: 24.99 },
        { nombre: 'Zapatos', formato: 'Talla 42', cantidad: 1, precio: 39.99 }
      ]
    },
    {
      fechaCreacion: '2023-01-02',
      estado: 'En preparación',
      productos: [
        { nombre: 'Libro', formato: 'Tapa blanda', cantidad: 3, precio: 8.99 },
        { nombre: 'Lápices', formato: 'Paquete de 12', cantidad: 2, precio: 3.49 }
      ]
    },
    {
      fechaCreacion: '2023-01-03',
      estado: 'En entrega',
      productos: [
        { nombre: 'Cámara', formato: 'Modelo 2023', cantidad: 1, precio: 299.99 }
      ]
    },
    {
      fechaCreacion: '2023-01-04',
      estado: 'Entregado',
      productos: [
        { nombre: 'Smartphone', formato: '64GB', cantidad: 1, precio: 499.99 },
        { nombre: 'Auriculares', formato: 'Bluetooth', cantidad: 1, precio: 29.99 }
      ]
    }
  ]);
  
  // Estado del pedido seleccionado para mostrar detalles en la ventana emergente
  const pedidoSeleccionado = ref(null);
  
  // Método para obtener el color del estado del pedido
  const getColor = (estado) => {
    switch (estado) {
      case 'Solicitado':
        return 'pink';
      case 'En preparación':
        return 'yellow';
      case 'En entrega':
        return 'orange';
      case 'Entregado':
        return 'green';
      default:
        return 'white';
    }
  };
  
  const mostrarDetallesPedido = (pedido) => {
    pedidoSeleccionado.value = pedido;
  };
  
// Función para cerrar los detalles del pedido y ocultar el componente detallesPedido
const cerrarDetallesPedido = () => {
  pedidoSeleccionado.value = null;
};
  </script>
  
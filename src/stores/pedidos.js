//imports
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePedidosStore = defineStore('pedidos', () => {
  //variables
  const pedidos = ref([])
  const link = 'https://reto3-losjavas.onrender.com/api';
  const url = "https://javieregibide.com/api";


  // Método para cargar productos desde la API
  async function buscarPedidosCliente(cliente_id) {
  
    try {
      const response = await fetch(`${link}/pedidos?cliente_id=${cliente_id}`);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error:', error.message);
  
      // Si no encuentra al cliente, devuelve false
      return false;
    }
  }

  //funcion para crear un pedido
  async function crearPedido(pedidoData) {

    try {
        const response = await fetch(`${link}/pedidos/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoData),
        });


        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error.message);

        // Puedes manejar el error según tus necesidades
        throw new Error('Error al crear el pedido');
    }
}

  
  

  return { buscarPedidosCliente, crearPedido }
})

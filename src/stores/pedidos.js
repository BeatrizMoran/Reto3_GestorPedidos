import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidos = ref([])
  const link = 'http://localhost/api';
  const url = "https://javieregibide.com/api";


  // Método para cargar productos desde la API
  async function buscarPedidosCliente(cliente_id) {
    //console.log('Entrando en la función buscar pedidos');
  
    try {
      const response = await fetch(`${url}/pedidos?cliente_id=${cliente_id}`);
  
      //console.log('URL de solicitud:', response.url);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      //console.log('Data pedidos:', data);
  
      return data;
    } catch (error) {
      console.error('Error:', error.message);
  
      // Si no encuentra al cliente, devuelve false
      return false;
    }
  }

  async function crearPedido(pedidoData) {
    console.log('Entrando en la función crear pedido');

    try {
        const response = await fetch(`${url}/pedidos/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoData),
        });

        console.log('URL de solicitud:', response.url);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Data del nuevo pedido:', data);

        return data;
    } catch (error) {
        console.error('Error:', error.message);

        // Puedes manejar el error según tus necesidades
        throw new Error('Error al crear el pedido');
    }
}

  
  

  return { buscarPedidosCliente, crearPedido/* Resto de las funciones y datos del almacén... */ }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidos = ref([])

  // Método para cargar productos desde la API
  async function buscarPedidosCliente(cliente_id) {
    console.log('Entrando en la función buscar pedidos');
  
    try {
      const response = await fetch(`http://localhost/api/pedidos?cliente_id=${cliente_id}`);
  
      console.log('URL de solicitud:', response.url);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Data pedidos:', data);
  
      return data;
    } catch (error) {
      console.error('Error:', error.message);
  
      // Si no encuentra al cliente, devuelve false
      return false;
    }
  }

  
  

  return { buscarPedidosCliente/* Resto de las funciones y datos del almacén... */ }
})

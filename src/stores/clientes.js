import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useClientesStore = defineStore('clientes', () => {
  const cliente = ref([])

  // Método para cargar productos desde la API
  async function comprobarCodigoCliente(codigo_cliente) {
    console.log('Entrando en la función buscarProductos');
  
    try {
      const response = await fetch(`http://localhost/api/cliente?codigo_cliente=${codigo_cliente}`);
  
      console.log('URL de solicitud:', response.url);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Data cliente:', data);
  
      return data;
    } catch (error) {
      console.error('Error:', error.message);
  
      // Si no encuentra al cliente, devuelve false
      return false;
    }
  }

  
  

  return { comprobarCodigoCliente/* Resto de las funciones y datos del almacén... */ }
})

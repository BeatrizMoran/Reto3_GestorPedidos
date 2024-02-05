//imports
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useClientesStore = defineStore('clientes', () => {
  const cliente = ref([])

  // Método para cargar productos desde la API
  async function comprobarCodigoCliente(codigo_cliente) {
    //variables
    const link = 'https://reto3-losjavas.onrender.com/api';
    const url = "https://javieregibide.com/api";

  
    try {
      const response = await fetch(`${link}/cliente?codigo_cliente=${codigo_cliente}`);
  
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

  //funcion asincrona para actualizar clieente a traves del objeto cliente
  async function actualizarCliente(objCliente) {
    try {
      const response = await fetch(`${link}/cliente/actualizar/${objCliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          codigo_cliente: objCliente.codigo_cliente,
          nombre: objCliente.nombre,
          direccion: objCliente.direccion,
          telefono: objCliente.telefono,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
    
      
  
      return data;
    } catch (error) {
      // Manejar errores
      console.error('Error al actualizar cliente:', error.message);
    }
  }
  
  
  

  return { comprobarCodigoCliente, actualizarCliente}



});

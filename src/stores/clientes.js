import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useClientesStore = defineStore('clientes', () => {
  const cliente = ref([])

  // Método para cargar productos desde la API
  async function comprobarCodigoCliente(codigo_cliente) {
    //console.log('Entrando en la función buscarProductos');
    const link = 'https://reto3-losjavas.onrender.com/api';
    const url = "https://javieregibide.com/api";

  
    try {
      const response = await fetch(`${link}/cliente?codigo_cliente=${codigo_cliente}`);
  
     // console.log('URL de solicitud:', response.url);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
     // console.log('Data cliente:', data);
  
      return data;
    } catch (error) {
      console.error('Error:', error.message);
  
      // Si no encuentra al cliente, devuelve false
      return false;
    }
  }

  async function actualizarCliente(objCliente) {
    try {
      const response = await fetch(`${link}/cliente/actualizar/${objCliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Puedes agregar otros encabezados si es necesario, como tokens de autenticación
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
      //console.log('Data cliente actualizado:', data);
      
  
      return data;
    } catch (error) {
      // Manejar errores
      console.error('Error al actualizar cliente:', error.message);
    }
  }
  
  
  

  return { comprobarCodigoCliente, actualizarCliente}



});

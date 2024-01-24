import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductosStore = defineStore('productos', () => {
  const listaProductos = ref([])

  // Método para cargar productos desde la API
  async function cargarProductosDesdeAPI() {
    try {
        const response = await fetch('http://localhost/api/productos');
        console.log(response);
      if (!response.ok) {
        throw new Error('Error al obtener productos desde la API')
      }

      const data = await response.json()
      console.log('Datos recibidos desde la API:', data);


      // Actualizar la lista de productos en el almacén
      listaProductos.value = data
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  function obtenerProductos() {
    return listaProductos.value
  }

  // Resto del código del almacén...

  return { cargarProductosDesdeAPI, obtenerProductos/* Resto de las funciones y datos del almacén... */ }
})

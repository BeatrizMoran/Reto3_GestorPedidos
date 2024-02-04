import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoriasStore = defineStore('categorias', () => {
    const listaCategorias = ref([])
    const link = 'http://localhost/api';
  
    // Método para cargar categorias desde la API
    async function cargarCategoriasDesdeAPI() {
      try {
        const response = await fetch(`${link}/categorias`);
       // console.log(response);
        if (!response.ok) {
          throw new Error('Error al obtener las categorias desde la API')
        }
  
        const data = await response.json()
        //console.log('Datos recibidos desde la API:', data);
  
        // Actualizar la lista de categorias en el almacén
         listaCategorias.value = data;
         return listaCategorias.value;
      } catch (error) {
        console.error('Error:', error.message)
      }
    }
  
    

    
  
  
    function obtenerCategorias() {
      return listaCategorias.value
    }
  
    return { cargarCategoriasDesdeAPI, obtenerCategorias}
  })
  
//imports
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoriasStore = defineStore('categorias', () => {

  //variables
    const listaCategorias = ref([])
    const link = 'https://reto3-losjavas.onrender.com/api';
    const url = "https://javieregibide.com/api";
  
    // Método para cargar categorias desde la API
    async function cargarCategoriasDesdeAPI() {
      try {
        const response = await fetch(`${link}/categorias`);
        if (!response.ok) {
          throw new Error('Error al obtener las categorias desde la API')
        }
  
        const data = await response.json()
  
        // Actualizar la lista de categorias en el almacén
         listaCategorias.value = data;
         return listaCategorias.value;
      } catch (error) {
        console.error('Error:', error.message)
      }
    }
  
    

    
  
  //funcion para obtener las categorias
    function obtenerCategorias() {
      return listaCategorias.value
    }
  
    return { cargarCategoriasDesdeAPI, obtenerCategorias}
  })
  
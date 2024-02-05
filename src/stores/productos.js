//imports
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductosStore = defineStore('productos', () => {
  //variables
  const listaProductos = ref([])
  const link = 'https://reto3-losjavas.onrender.com/api';
  const url = "https://javieregibide.com/api";

  // Método para cargar productos desde la API
  async function cargarProductosDesdeAPI() {
    try {
      const response = await fetch(`${link}/productos`);
      if (!response.ok) {
        throw new Error('Error al obtener productos desde la API')
      }

      const data = await response.json()

      // Actualizar la lista de productos en el almacén
      listaProductos.value = data;

      return data;
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  //metodo para buscar productos a traves de un nombre
   async function buscarProductos(nombre) {
    try {
      const response = await fetch(`${link}/productos?nombre=${nombre}`);
    
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }      

      const data = await response.json();
      listaProductos.value = data;


       return data;
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  
  


  function obtenerProductos() {
    return listaProductos.value
  }

  return { cargarProductosDesdeAPI, obtenerProductos, buscarProductos }
})

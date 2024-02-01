<template>
    <div class="row">
        <div class="col-8" style="background-color: red;">
            <p><i class="fa-solid fa-cart-shopping"></i> Carrito ({{ listaCompra.length }} artículos)</p>

            <div class="row my-3 px-2" v-for="(producto, key) in listaCompra" :key="key">
                
                <div class="col-3 px-2 py-2" style="background-color: aqua;" >
                    <img :src="getImageUrl(producto.imagen)" alt="Imagen del producto" class="img-fluid me-md-3 mb-3">
                </div>
                <div class="col-5 mx-3  d-flex justify-content-center align-items-center flex-column" style="background-color: pink;">
                    <p>{{ producto.nombre }}</p>
                    <p><b>Cantidad:</b> {{ producto.cantidad }}</p>
                    <p><b>Precio:</b> {{ producto.precio }}€</p>
                </div>
     
                <div class="col-3 d-flex justify-content-center align-items-center" style="background-color: bisque;">
                    <button @click="feliminarProducto(producto.id)">Eliminar</button>
                </div>
            </div>
         
            
        </div>
        <div class="col-4" style="background-color: blue;">
        
        </div>

    </div>
</template>
  
  
  
<style lang="scss" scoped>
@import '../assets/style.scss';
</style>
  
<script setup>
import { ref, onBeforeMount } from 'vue';

// Lista de compra
const lista = ref();
const listaCompra = ref([]);

onBeforeMount(async () => {
    try {
        // Lista de compra
        lista.value = localStorage.getItem("cart");
        // Parsear y obtener los valores del objeto
        listaCompra.value = Object.values(JSON.parse(lista.value) || {});
        console.log("Lista de la compra:", listaCompra.value);
    } catch (error) {
        console.error("Error al cargar la lista de la compra:", error);
    }
});

function feliminarProducto(idProducto) {
    // Obtener la lista de compra del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Eliminar el producto del carrito
    delete cart[idProducto];

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la lista de compra en el estado
    listaCompra.value = Object.values(cart);
}
</script>
  

  
<script>
export default {
    methods: {
        getImageUrl(imagen) {
            // Utiliza la URL de la API Laravel para acceder a las imágenes
            return 'http://localhost/api/images/' + imagen;
        }
    }
}
</script>
  
<style lang="scss" scoped>
img{
    height: 160px;
    width: 150px;
  }
@import '../assets/style.scss';
</style>
  
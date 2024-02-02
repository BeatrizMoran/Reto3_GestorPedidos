<template>
 
      <nav class="row navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-between my-4">

        <!-- Botón desplegable -->
        <div class="col-2 col-lg-1 px-4">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <!-- Logo -->
        <div class="col-2 col-lg-1 px-1 text-center">
          <img src="../assets/logo.png" alt="Logo" class="img-fluid">
        </div>

        <!-- Contenido del navbar -->
        <div class="collapse navbar-collapse col-md-5 col-lg-6 px-4" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active" exact>Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/productos" class="nav-link" active-class="active">Productos</router-link>
            </li>
            <li class="nav-item" v-if="clienteEnLocalStorage">
              <router-link to="/pedidos" class="nav-link" active-class="active">Pedidos</router-link>
            </li>
            <li class="nav-item" v-if="clienteEnLocalStorage">
              <router-link to="/perfil" class="nav-link" active-class="active">Perfil</router-link>
            </li>
            <li class="nav-item" v-if="clienteEnLocalStorage">
              <router-link to="/cart" class="nav-link" active-class="active">Cesta compra</router-link>
            </li>
            <li class="nav-item col-5" v-if="!clienteEnLocalStorage">
              <input class="form-control form-control-sm" type="search" placeholder="Insertar Código..."
                aria-label="Codificacion" @keypress.enter="checkCodigo" v-model="codigoCLiente" enabled />
            </li>
            <li class="nav-item" v-if="clienteEnLocalStorage">
              <a class="nav-link" active-class="active" @click="cerrarSesion">Cerrar ssesion</a>
            </li>
          </ul>
        </div>

        <!-- Buscador -->
        <div class="col-7 col-md-7 col-lg-4 px-4">
          <form class="d-flex" @submit.prevent="buscar">
            <input class="form-control me-2" type="search" v-model="terminoBusqueda" placeholder="Buscar productos..." aria-label="Buscar">
            <button class="btn btn-outline-success" type="submit" @click="buscar">Buscar</button>
          </form>
        </div>

      </nav>

</template>

<script setup>
//imports
import { useProductosStore } from '../stores/productos';
import { useClientesStore } from "../stores/clientes";
import { ref, defineEmits, watchEffect } from 'vue';
import { useRouter } from 'vue-router';


//variables
const emit = defineEmits(['listaProductos', "buscador"]); 
const terminoBusqueda = ref('');
const productosStore = useProductosStore();
const clientesStore = useClientesStore();
const listaProductos = ref([]);
const codigoCLiente = ref();
const cliente = ref();
const clienteEnLocalStorage = ref(false);
const router = useRouter();


//vigila  que cualquier cambio en el localStorage se refleje en la aplicacion
watchEffect(() => {
  const cliente = localStorage.getItem('cliente');
  clienteEnLocalStorage.value = cliente !== null;
});


//Cuando usamos el buscador, ya sea presionando ENTER o dando click al boton buscar
const buscar = async () => {

  try {
    
    if (terminoBusqueda.value === "") {
      listaProductos.value = await productosStore.cargarProductosDesdeAPI();
      //console.log("Estoy en el nav, todos los productos", listaProductos.value);
      emit('listaProductos', listaProductos);
      
    } else {
      listaProductos.value = await productosStore.buscarProductos(terminoBusqueda.value);
      //console.log("Estoy en el nav, búsqueda filtrada: ", listaProductos.value);
      emit('listaProductos', listaProductos);
      emit('buscador', terminoBusqueda.value);

    }
    router.push({ name: 'productos' });
   
  } catch (error) {
    console.error('Error al buscar productos:', error.message);
  }
};


//comprueba el codigo, lo guarda en LocalStorage y actualizando asi la app
const checkCodigo = async () => {
  try {
    cliente.value = await clientesStore.comprobarCodigoCliente(codigoCLiente.value);

    if (cliente.value === false) {
      //console.log('Cliente no encontrado');
    } else {
      //console.log('Cliente encontrado:', cliente);
      const objCliente = {
        codigo_cliente: codigoCLiente.value,
        nombre: cliente.value.nombre,
        id: cliente.value.id,
        direccion: cliente.value.direccion,
        telefono: cliente.value.telefono
      };
      localStorage.setItem("cliente", JSON.stringify(objCliente));

      clienteEnLocalStorage.value = true;
      location.reload();
    }

  } catch (error) {
    console.error('Error al buscar productos:', error.message);
  }
};


//cierra la sesion del cliente y lo borra del LocalStorage
function cerrarSesion() {
  try {
    localStorage.removeItem("cliente");
    clienteEnLocalStorage.value = null;
    router.push('/');  

  } 
  catch (error) 
  {
    alert(error);  
  }
}
</script>



<style lang="scss" scoped>
@import '../assets/style.scss';

img {
  max-width: 100%;
  height: auto;
  max-height: 50px;
}
</style>
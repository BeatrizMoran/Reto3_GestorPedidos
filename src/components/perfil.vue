<template>
  <div class="container-fluid ">
    <div class="row">
      <div class="col-6">
        <div class="perfil-container p-4 rounded">
          <h1 class="text-white">Perfil de Usuario</h1>


          <!-- Formulario para mostrar y modificar los datos del usuario -->
          <form>
            <div class="mb-3">
              <label for="codigoCliente" class="form-label text-white ">Código del Cliente</label>
              <input type="text" class="form-control" id="codigoCliente" :value="codigoCliente" disabled>
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label text-white">Nombre</label>
              <input type="text" class="form-control" id="nombre" :value="nombre" :readonly="!editMode">
            </div>
            <div class="mb-3">
              <label for="direccion" class="form-label text-white">Dirección</label>
              <input type="text" class="form-control" id="direccion" :value="direccion" :readonly="!editMode">
            </div>
            <div class="mb-3">
              <label for="telefono" class="form-label text-white">Teléfono</label>
              <input type="text" class="form-control" id="telefono" :value="telefono" :readonly="!editMode">
            </div>
            <button type="button" class="btn btn-primary text-white" @click="toggleEditMode">
              {{ editMode ? 'Guardar cambios' : 'Modificar Perfil' }}
            </button>
            <button v-if="editMode" type="button" class="btn btn-secondary" @click="guardarCambios">Cancelar</button>
          </form>
        </div>
      </div>

      <!--huequecito-->
        <div class="col-1"><br></div>


        <div class="col-5 d-flex align-self-center">
            <div class="perfil-container  p-4 rounded">
                <h2 class="text-white">Pedidos Realizados</h2>
                <table class="table table-grey table-striped table-hover">

                    <thead>
                        <tr>
                            <th>Número de Pedido</th>
                            <th>Fecha</th>
                            <th>Ver Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(pedido, index) in pedidos" :key="index">
                            <td>{{ 'Pedido ' + (index + 1) }}</td>
                            <td>{{ calcularFecha(pedido.fechaCreacion) }}</td>
                            <td>
                                <button class="btn btn-link p-0">
                                    <img src="../assets/ver.png" alt="Ver detalles" class="img-fluid" style="max-width: 20px;">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Datos simulados del usuario
  const codigoCliente = ref(12345);
  const nombre = ref('Nombre de Usuario');
  const direccion = ref('Dirección de Usuario');
  const telefono = ref('Teléfono de Usuario');
  

  const editMode = ref(false);
  
  // cambiar entre el modo de edición y no edición 
  const toggleEditMode = () => {
    try {
      editMode.value = !editMode.value;
    } catch (error) {
      alert(error);
    }
   
  };
  
  // Funcion para guardar los cambios en el formulario
  const guardarCambios = () => {

    try {
      nombre.value = document.getElementById('nombre').value;
      direccion.value = document.getElementById('direccion').value;
      telefono.value = document.getElementById('telefono').value;
      console.log(nombre,direccion,telefono);
      editMode.value = false;
      
    } catch (error) {
      alert(error);
    }

};

// Funcion para calcular la diferencia de tiempo entre la fecha del pedido y la fecha actual
const calcularFecha = (fechaPedido) => {
  try {
    const fechaPedidoDate = new Date(fechaPedido);
    const fechaActualDate = new Date();
    const diff = fechaActualDate - fechaPedidoDate;
    const segundos = Math.floor(diff / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);
    const años = Math.floor(meses / 12);

    if (años > 0) {
        return `Hace ${años} año${años > 1 ? 's' : ''}`;
    } else if (meses > 0) {
        return `Hace ${meses} mes${meses > 1 ? 'es' : ''}`;
    } else if (dias > 0) {
        return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    } else {
        return 'Hoy';
    }
  } catch (error) {
    alert(error);
  }
    
};


//esto lo borraremos 
const pedidos = ref([
    {
        fechaCreacion: '2024-01-01',
        estado: 'Entregado',
        productos: [
            { nombre: 'Smartphone', formato: '64GB', cantidad: 1, precio: 499.99 },
            { nombre: 'Auriculares', formato: 'Bluetooth', cantidad: 1, precio: 29.99 }
        ]
    },
    {
        fechaCreacion: '2023-12-15',
        estado: 'En entrega',
        productos: [
            { nombre: 'Cámara', formato: 'Modelo 2023', cantidad: 1, precio: 299.99 }
        ]
    },
    {
        fechaCreacion: '2023-11-30',
        estado: 'En preparación',
        productos: [
            { nombre: 'Libro', formato: 'Tapa blanda', cantidad: 3, precio: 8.99 },
            { nombre: 'Lápices', formato: 'Paquete de 12', cantidad: 2, precio: 3.49 }
        ]
    },
    {
        fechaCreacion: '2023-11-15',
        estado: 'Solicitado',
        productos: [
            { nombre: 'Camiseta', formato: 'Talla M', cantidad: 2, precio: 12.99 },
            { nombre: 'Pantalones', formato: 'Talla L', cantidad: 1, precio: 24.99 },
            { nombre: 'Zapatos', formato: 'Talla 42', cantidad: 1, precio: 39.99 }
        ]
    }
]);
  </script>
  
  

<style lang="scss" scoped>

@import '../assets/style.scss';

  </style>
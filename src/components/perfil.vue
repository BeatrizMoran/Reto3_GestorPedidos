<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <div class="perfil-container p-4 rounded">
          <h1 class="text-white">Perfil de Usuario</h1>

          <!-- Formulario para mostrar y modificar los datos del usuario -->
          <form>
            <div class="mb-3">
              <label for="codigoCliente" class="form-label text-white">Código del Cliente</label>
              <input type="text" class="form-control" id="codigoCliente" :value="objCliente ? objCliente.codigo_cliente : ''" disabled>
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label text-white">Nombre</label>
              <input type="text" class="form-control" id="nombre" :value="objCliente ? objCliente.nombre : ''" :readonly="!editMode">
            </div>
            <div class="mb-3">
              <label for="direccion" class="form-label text-white">Dirección</label>
              <input type="text" class="form-control" id="direccion" :value="objCliente ? objCliente.direccion : ''" :readonly="!editMode">
            </div>
            <div class="mb-3">
              <label for="telefono" class="form-label text-white">Teléfono</label>
              <input type="text" class="form-control" id="telefono" :value="objCliente ? objCliente.telefono : ''" :readonly="!editMode">
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
        <div class="perfil-container p-4 rounded">
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
                <td>{{ pedido.numero_pedido }}</td>
                <td>{{ pedido.fecha_pedido }} - {{ calcularFecha(pedido.fecha_pedido) }}</td>
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
  import { ref, onBeforeMount } from 'vue';

  import { usePedidosStore } from "../stores/pedidos";

const pedidosStore = usePedidosStore();
const pedidos = ref([]);

  // Datos simulados del usuario

  onBeforeMount(async () => {
  try {
    if (objCliente) {
      const response = await pedidosStore.buscarPedidosCliente(objCliente.id);
      pedidos.value = response.data;
      console.log("lista pedidos:", pedidos.value);
    }
  } catch (error) {
    console.error("Error al cargar los pedidos:", error);
  }
});

 
  

  const editMode = ref(false);
  
  // cambiar entre el modo de edición y no edición 
  const toggleEditMode = () => {
    try {
      editMode.value = !editMode.value;
    } catch (error) {
      alert(error);
    }
   
  };

  //cliente localstorage
  const clienteAlmacenado = localStorage.getItem("cliente");
  const objCliente = JSON.parse(clienteAlmacenado);
  
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
    // Parseamos la fecha en formato "día/mes/año"
    const [dia, mes, año] = fechaPedido.split('/');
    const fechaPedidoDate = new Date(`${mes}/${dia}/${año}`);
    const fechaActualDate = new Date();

    const diffMilliseconds = fechaActualDate - fechaPedidoDate;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return `Hace ${diffYears} año${diffYears > 1 ? 's' : ''}`;
    } else if (diffMonths > 0) {
      return `Hace ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    } else if (diffWeeks > 0) {
      return `Hace ${diffWeeks} semana${diffWeeks > 1 ? 's' : ''}`;
    } else if (diffDays > 0) {
      return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `Hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return 'Hoy';
    }
  } catch (error) {
    alert(error);
  }
};





  </script>
  
  

<style lang="scss" scoped>

@import '../assets/style.scss';

  </style>
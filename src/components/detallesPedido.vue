<template>
    <div class="container-fluid detalles-pedido-container">
        <div class="row">
            <div class="detalles-pedido-modal" v-if="pedido">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Detalles del Pedido</h5>
                        </div>
                        <div class="modal-body">
                            <!--detalles del pedido -->
                            <div v-if="pedido">
                                <p><strong>Fecha de Creación:</strong> {{ pedido.fechaCreacion }}</p>
                                <p><strong>Estado:</strong> {{ pedido.estado }}</p>
                                <p><strong>Productos:</strong></p>
                                <ul>
                                    <li v-for="(producto, index) in pedido.productos" :key="index">
                                        {{ producto.nombre }} - {{ producto.formato }} - Cantidad: {{ producto.cantidad }} - Precio: {{ producto.precio }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                             <button type="button" class="btn btn-secondary" @click="cerrarDetallesPedido">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
//imports
import { defineProps, defineEmits  } from 'vue';

// variables
const props = defineProps(['pedido']);
const emits = defineEmits(['cerrar'])

// Función para cerrar los detalles del pedido y emitir el evento 'cerrar'
const cerrarDetallesPedido = () => {
    try {
        emits('cerrar');
    } 
    catch (error) {
            alert(error);
    }

};
</script>

<style  scoped>

</style>
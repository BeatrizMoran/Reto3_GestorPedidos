<script setup>
import {ref,defineEmits, onUnmounted} from 'vue';
const emit=defineEmits(['indicarUnidades'])

const cantidad = ref('');


function indicar()
{
    const cantidadValue = parseInt(cantidad.value);
    if (!isNaN(cantidadValue)) {
        console.log("hola")
        // Emitir el evento solo si la cantidad es un número válido
        emit('indicarUnidades', cantidadValue);
    } 
}


</script>

<template>
    <div class="container mt-3">
      <label class="form-label">
        Unidades:
        <input v-model="cantidad" class="form-control" required />
      </label>
      <button @click="indicar" class="btn btn-primary mt-2">Indicar</button>
    </div>
  </template>
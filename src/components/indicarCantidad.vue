<script setup>
//imports
import {ref,defineEmits, onUnmounted} from 'vue';

//variables
const emit=defineEmits(['indicarUnidades'])
const cantidad = ref('');

//cambiar el valor de cantidad
function indicar()
{
    const cantidadValue = parseInt(cantidad.value);
    if (!isNaN(cantidadValue) && cantidadValue > 0) {
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
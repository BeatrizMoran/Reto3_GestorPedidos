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
    <label>
        Unidades:
        <input v-model="cantidad" required />
        <button @click="indicar">Indicar</button>
    </label>
</template>
<script setup>
import {usePacienteStore} from '../../Stores/pacientes.js';
import Grilla from './Grilla.vue';
import {simplePassing} from '../../Stores/simplePassing.js';
const pacienteStore = usePacienteStore();
const sp = simplePassing();
sp.parametros.sender = 0; //0 para cuando viene de la grilla de pacientes, 1 para la grilla de tratamientos, 2 para la grilla de pagos
</script>
<template>
       <Grilla :objetos="pacienteStore.pacientes" ></Grilla>
</template>
<style>

</style>
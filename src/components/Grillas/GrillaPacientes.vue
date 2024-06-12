<script setup>
import {usePacienteStore} from '../../Stores/pacientes.js';
import Grilla from './Grilla.vue';
const pacienteStore = usePacienteStore();

</script>
<template>
       <Grilla :objetos="pacienteStore.pacientes"></Grilla>
</template>


<style>
</style>
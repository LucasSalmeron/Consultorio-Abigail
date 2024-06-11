<script setup>
import {usePacienteStore} from '../Stores/pacientes.js';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Grilla from './Grilla.vue';
const pacienteStore = usePacienteStore();



</script>



<template>
       <Grilla :objetos="pacienteStore.pacientes"></Grilla>
</template>


<style>






</style>
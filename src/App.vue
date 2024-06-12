<script setup>
import GrillaPacientes from './components/Grillas/GrillaPacientes.vue';
import Formulario from './components/Formularios/Formulario.vue';
import { usePacienteStore } from './Stores/pacientes';

const pacienteStore = usePacienteStore();

</script>


<template>
  <div v-if="pacienteStore.isLoading">
  
    Cargando...
  
  
  </div>

  <div v-else>
    <GrillaPacientes></GrillaPacientes>
  
   <Formulario :objeto = "{p: pacienteStore.pacientes[5]}"></Formulario>
   <Formulario></Formulario>
  </div>
  
  
</template>


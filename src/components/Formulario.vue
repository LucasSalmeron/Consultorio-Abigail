<script setup>
import { usePacienteStore } from '../Stores/pacientes.js';
import Form from './Form.vue';
const pacienteStore = usePacienteStore();

const paciente = {
  Dni: "",
  Nombre: "",
  Telefono: "",
  Email: "",
  Direccion: "",
};

const addPaciente = async(paciente) =>{
  console.log("submitting");
  console.log(paciente);
}


function submit (){
  addPaciente(paciente);
}

</script>





<template>
<Form :objeto="paciente" :retorno="submit">  </Form>
</template>

<style>

</style>


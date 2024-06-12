<script setup>
import { usePacienteStore } from '../../Stores/pacientes.js';
import Form from './Form.vue';
const pacienteStore = usePacienteStore();
const pEdit = defineProps({
  objeto: Object
})
const paciente = {
  Dni: "",
  Nombre: "",
  Telefono: "",
  Email: "",
  Direccion: "",
};

function submitAdd (){
  pacienteStore.addPaciente(paciente);
}
function submitEdit(){
  pacienteStore.editPaciente(paciente);
}
</script>

<template>
  <Form v-if="pEdit.objeto==undefined" :objeto="paciente" :retorno="submitAdd">  </Form>
  <Form v-else :objeto="pEdit.objeto.p" :retorno="submitEdit">  </Form>
</template>

<style>

</style>


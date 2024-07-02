<script setup>
import { usePacienteStore } from '../../Stores/pacientes.js';
import Form from './Form.vue';
import { simplePassing } from '../../Stores/simplePassing';
const sp = simplePassing();
const pacienteStore = usePacienteStore();
console.log(pacienteStore.selectedPaciente);
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
  <Form v-if="sp.parametros.objeto==''" :objeto="paciente" :retorno="submitAdd">  </Form>
  <Form v-else :objeto="sp.parametros.objeto" :retorno="submitEdit">  </Form>
</template>

<style>

</style>


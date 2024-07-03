<script setup>
import { usePacienteStore } from '../../Stores/pacientes.js';
import Button from 'primevue/button';
import {ref} from 'vue';
import Dialog from 'primevue/dialog';
import { onUpdated } from 'vue';
import { computed } from 'vue';
const pacienteStore = usePacienteStore();

const props = defineProps({
  v: Boolean
})
let paciente;

onUpdated(() => {
  
  if(pacienteStore.selectedPaciente){
    paciente = pacienteStore.selectedPaciente;
    isNew = false;
  }else{
    isNew = true;
    paciente = {
    Dni: "",
    Nombre: "",
    Telefono: "",
    Email: "",
    Direccion: "",
    };
  }
  console.log(pacienteStore.selectedPaciente);
});

let isNew = ref(true); //edit = false, add = true
let titulo = "Añadir Paciente Nuevo";



function submit (){
  if(!isValid()){
    alert("Todos los campos son obligatorios.");
    return;
  }
  if(isNew){
    if(isNewDni()){
      pacienteStore.addPaciente(paciente);
      props.v = false;
     // utils.toggleVisibilidadForm(false);
    }else{
      alert("El dni ya existe en la base de datos.");
      return;
    }
  }else{
    pacienteStore.editPaciente(paciente);
   // utils.toggleVisibilidadForm(false);
    props.v = false;
   pacienteStore.selectPaciente(null);
  }
}

function isNewDni(){
  return pacienteStore.checkNewDni(paciente.Dni);
}

function isValid(){
  let valid = true;
  if(!paciente.Dni){
    valid = false;
  }
  if(!paciente.Nombre){
    valid = false;
  }
  if(!paciente.Telefono){
    valid = false;
  }
  if(!paciente.Email){
    valid = false;
  }
  if(!paciente.Direccion){
    valid = false;
  }
  return valid;
}
</script>

<template>
   <Dialog  :style="{width: '450px'}" :modal="true"  >
  <form class="form">
    <h1 class="title">{{ titulo }}</h1>
      <div class="form-group">
          <label class="form-label" for="dni">Dni</label>
          <input v-model="paciente.Dni" class="form-input" type="text" id="dni" placeholder="Dni"/>
      </div>
      <div class="form-group">
          <label class="form-label" for="nombre">Nombre</label>
          <input v-model="paciente.Nombre" class="form-input" type="text" id="nombre" placeholder="Nombre"/>
      </div>
      <div class="form-group">
          <label class="form-label" for="telefono">Telefono</label>
          <input v-model="paciente.Telefono" class="form-input" type="text" id="telefono" placeholder="Telefono"/>
      </div>
      <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input v-model="paciente.Email" class="form-input" type="text" id="email" placeholder="Email"/>
      </div>
      <div class="form-group">
          <label class="form-label" for="direccion">Direccion</label>
          <input v-model="paciente.Direccion" class="form-input" type="text" id="direccion" placeholder="Direccion"/>
      </div>



      <Button label="submit" v-on:click="submit" class="form-button">GUARDAR</Button>
  </form>
</Dialog>
  
  
</template>


<style>
.title{
  text-align: center;
  color:black;
}
.form-group{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.form-label{
  font-weight: bold;
  font-size: larger;
  color:black;
  width: 150px;
  
}

.form-input{
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 5px;
  width: 250px;
  font-size: larger;
}
.form-button{
  margin-top: 20px;
  padding: 15px 30px;
  border-radius: 4px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

</style>




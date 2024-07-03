<script setup>
import { usePacienteStore } from '../../Stores/pacientes';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const pacienteStore = usePacienteStore();
const props = defineProps({
    v: Object,
    paciente: Object,
    isNew: Boolean,
    titulo: String
})
const paciente = props.paciente;



function submit() {
    if (!isValid()) {
        console.log(paciente);
        alert("Todos los campos son obligatorios.");
        return;
    }
    if (props.isNew) { 
        if (isNewDni()) {
            pacienteStore.addPaciente(paciente);
            props.v.value = false;
        } else {
            alert("El DNI ya existe en la base de datos.");
            return;
        }
    } else {
        pacienteStore.editPaciente(paciente);
        props.v.value = false;
    }
}

function isNewDni() {
    return pacienteStore.checkNewDni(paciente.Dni);
}

function isValid() {
    let valid = true;
    if (!paciente.Dni) {
        valid = false;
    }
    if (!paciente.Nombre) {
        valid = false;
    }
    if (!paciente.Telefono) {
        valid = false;
    }
    if (!paciente.Email) {
        valid = false;
    }
    if (!paciente.Direccion) {
        valid = false;
    }
    return valid;
}


</script>






<template>

<Dialog v-model:visible="props.v.value" :style="{width: '450px'}" :modal="true" >
              <form class="form">
                     <h1 class="titleModal">{{ props.titulo }}</h1>
                     <div class="form-group">
                            <label class="form-label" for="dni" >Dni</label>
                            <input v-model="paciente.Dni" class="form-input" type="text" id="dni" placeholder="Dni" :disabled="!isNew"/>
                     </div>
                     <div class="form-group">
                            <label class="form-label" for="nombre">Nombre</label>
                            <input v-model="paciente.Nombre" class="form-input" type="text" id="nombre" placeholder="Nombre" />
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

.titleModal{
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
  
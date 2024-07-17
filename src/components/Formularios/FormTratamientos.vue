<script setup>
import { useTratamientoStore } from '../../Stores/tratamientos';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { usePacienteStore } from '../../Stores/pacientes';
const tratamientoStore = useTratamientoStore();
const pacienteStore = usePacienteStore();
const props = defineProps({
    v: Object,
    tratamiento: Object,
    isNew: Boolean,
    titulo: String
})
const tratamiento = props.tratamiento;


function submit() {
    if (!isValid()) {
        console.log(tratamiento);
        alert("Todos los campos son obligatorios.");
        return;
    }
    if (props.isNew) { 
        tratamientoStore.addTratamiento(tratamiento);
        props.v.value = false;  
    } else {
        tratamientoStore.editTratamiento(tratamiento);
        props.v.value = false;
    }
}

function isValid() {
    let valid = true;
    if (!tratamiento.Id) {
        valid = false;
    }
    if (!tratamiento.Fecha) {
        valid = false;
    }
    if (!tratamiento.Nombre) {
        valid = false;
    }
    if (!tratamiento.Paciente) {
        valid = false;
    }
    if (!tratamiento.Presupuesto) {
        valid = false;
    }
    if (!tratamiento.Descripcion) {
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
                            <label class="form-label" for="Paciente" >Paciente</label>
                            <input v-model="tratamiento.Paciente" class="form-input" type="text" id="paciente" placeholder="Paciente" disabled/>
                     </div>
                        <div class="form-group">
                            <label class="form-label" for="id" >Id</label>
                            <input v-model="tratamiento.Id" class="form-input" type="text" id="id" placeholder="Id" disabled/>
                        </div>
                     
                     <div class="form-group">
                            <label class="form-label" for="fecha">Fecha</label>
                            <input v-model="tratamiento.Fecha" class="form-input" type="text" id="fecha" placeholder="Fecha" />
                     </div>
                     <div class="form-group">
                            <label class="form-label" for="nombre">Nombre</label>
                            <input v-model="tratamiento.Nombre" class="form-input" type="text" id="nombre" placeholder="Nombre"/>
                     </div>
                     
                     <div class="form-group">
                            <label class="form-label" for="presupuesto">Presupuesto</label>
                            <input v-model="tratamiento.Presupuesto" class="form-input" type="text" id="presupuesto" placeholder="Presupuesto"/>
                     </div>
                     <div class="form-group">
                            <label class="form-label" for="descripcion">Descripcion</label>
                            <input v-model="tratamiento.Descripcion" class="form-input" type="text" id="descripcion" placeholder="Descripcion"/>
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
  


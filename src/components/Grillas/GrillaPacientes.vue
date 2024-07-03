<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {ref, computed} from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import { usePacienteStore } from '../../Stores/pacientes';
import { useConfirm } from 'primevue/useconfirm';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';


//TODO CAMBIAR DE SELECTEDPACIENTE DE VUELTA A SELECTED PARA QUE NO SE MODIFIQUE DE FORMA INCORRECTA

const pacienteStore = usePacienteStore();
const v = ref(false);

const filters = ref({global: {value: null, matchMode: 'contains'}});
const paciente0 = {Dni: '', Nombre: '', Telefono: '', Email: '', Direccion: ''};
let titulo = ref('Añadir Paciente');
let isNew = ref(false);


const añadir = () => {
       pacienteStore.selectPaciente(paciente0);
       titulo = 'Añadir Paciente';
       isNew = true;
    v.value = true;
}
const editar = (item) => {
    pacienteStore.selectPaciente(item);
    isNew = false;
    titulo = 'Editar Paciente';
    v.value = true;
    console.log(pacienteStore.selectedPaciente);
}

const eliminar = (item) => {
       pacienteStore.selectPaciente(item);
    deleteIt();
}

const confirm = useConfirm();
const deleteIt = () => {
confirm.require({
  message: '¿Seguro que quieres eliminar el paciente?',
  icon: 'pi pi-exclamation-triangle',
  acceptClass: 'p-button-danger',
  acceptLabel: 'Si',
  accept: () => {
    pacienteStore.deletePaciente(pacienteStore.selectedPaciente.Dni);
  }
})
}




function submit() {
    if (!isValid()) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    console.log(pacienteStore.selectedPaciente)
    if (isNew) { 
       console.log("pasa por 1");
        if (isNewDni()) {
            pacienteStore.addPaciente(pacienteStore.selectedPaciente);
            console.log("pasa por 2");
            v.value = false;
        } else {
            alert("El DNI ya existe en la base de datos.");
            return;
        }
    } else {
       console.log("pasa por 3");
        pacienteStore.editPaciente(pacienteStore.selectedPaciente);
        v.value = false;
    }
}

function isNewDni() {
    return pacienteStore.checkNewDni(pacienteStore.selectedPaciente.Dni);
}

function isValid() {
    let valid = true;
    if (!pacienteStore.selectedPaciente.Dni) {
        valid = false;
    }
    if (!pacienteStore.selectedPaciente.Nombre) {
        valid = false;
    }
    if (!pacienteStore.selectedPaciente.Telefono) {
        valid = false;
    }
    if (!pacienteStore.selectedPaciente.Email) {
        valid = false;
    }
    if (!pacienteStore.selectedPaciente.Direccion) {
        valid = false;
    }
    return valid;
}


</script>


<template>
    <h1>{{ v }}</h1>
    <h1 v-if="pacienteStore.pacientes==null">Cargando...</h1>
<div v-else>
       <div class="card">
              <Toolbar class="mb-6">
                     <template #start>
                            <Button label ="Nuevo" severity="success" icon="pi pi-plus" class ="mr-2" v-on:click="añadir()"/>
                     </template>
                     <template #end>
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                     </template>
              </Toolbar>
       </div>
       <DataTable ref ="dt" :value="pacienteStore.pacientes"
       dataKey = "Dni"
       :paginator = "true"
       :rows = "10"
       :filters = "filters"
       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 20]"
                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} pacientes">

       <Column field="Dni" header="Dni" sortable style="min-width:12rem"></Column>
       <Column field="Nombre" header="Nombre" sortable style="min-width:16rem"></Column>
       <Column field="Telefono" header="Telefono" sortable style="min-width:12rem"></Column>
       <Column field="Email" header="Email" sortable style="min-width:16rem"></Column>
       <Column field="Direccion" header="Direccion" sortable style="min-width:20rem"></Column>
       <Column style ="min-width:8rem">
              <template #body="slotProps">
                     <Button icon="pi pi-pencil" outlined rounded class ="mr-2" v-on:click="editar(slotProps.data)"></Button>
                     <Button icon ="pi pi-trash" outlined rounded severity="danger" v-on:click="eliminar(slotProps.data)"></Button>
              </template>
       </Column>
       </DataTable>
       </div>
       <ConfirmDialog v-model="deleteIt"></ConfirmDialog>
       <Dialog v-model:visible="v" :style="{width: '450px'}" :modal="true" >
              <form class="form">
                     <h1 class="titleModal">{{ titulo }}</h1>
                     <div class="form-group">
                            <label class="form-label" for="dni">Dni</label>
                            <input v-model="pacienteStore.selectedPaciente.Dni" class="form-input" type="text" id="dni" placeholder="Dni"/>
                     </div>
                     <div class="form-group">
                            <label class="form-label" for="nombre">Nombre</label>
                            <input v-model="pacienteStore.selectedPaciente.Nombre" class="form-input" type="text" id="nombre" placeholder="Nombre"/>
                     </div>
                     <div class="form-group">
                            <label class="form-label" for="telefono">Telefono</label>
                            <input v-model="pacienteStore.selectedPaciente.Telefono" class="form-input" type="text" id="telefono" placeholder="Telefono"/>
                     </div>
                     <div class="form-group">
                            <label class="form-label" for="email">Email</label>
                            <input v-model="pacienteStore.selectedPaciente.Email" class="form-input" type="text" id="email" placeholder="Email"/>
                     </div>
                     <div class="form-group">
                            <label class="form-label" for="direccion">Direccion</label>
                            <input v-model="pacienteStore.selectedPaciente.Direccion" class="form-input" type="text" id="direccion" placeholder="Direccion"/>
                     </div>
                     <Button label="submit" v-on:click="submit" class="form-button">GUARDAR</Button>
              </form>
       </Dialog>
</template>


<style>
.column{
    color: black;
    min-width: 200px;
}
#body{
       align-items: center;
       justify-content: center;
       display: flex;
       flex-direction: column;
}
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

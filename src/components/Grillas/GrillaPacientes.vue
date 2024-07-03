<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {ref, computed, reactive} from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import { usePacienteStore } from '../../Stores/pacientes';
import { useConfirm } from 'primevue/useconfirm';
import FormPacientes from '../Formularios/FormPacientes.vue';
import ConfirmDialog from 'primevue/confirmdialog';


//TODO VER SI PODEMOS VOLVER A TENER DIVIDIDOS FORM DE GRILLA??? DEFINIR

const pacienteStore = usePacienteStore();
const v1 = ref(false);
const v = computed(() => v1);

const filters = ref({global: {value: null, matchMode: 'contains'}});

let paciente = reactive({Dni: '', Nombre: '', Telefono: '', Email: '', Direccion: ''});
const titulo = ref('Añadir Paciente');
const isNew = ref(false);


const añadir = () => {
       paciente.Dni = '';
       paciente.Nombre = '';
       paciente.Telefono = '';
       paciente.Email = '';
       paciente.Direccion = '';
       titulo.value = 'Añadir Paciente';
       isNew.value = true;
       v1.value = true;
}
const editar = (item) => {
    paciente.Dni = item.Dni;
    paciente.Nombre = item.Nombre;
    paciente.Telefono = item.Telefono;
    paciente.Email = item.Email;
    paciente.Direccion = item.Direccion;
    isNew.value = false;
    titulo.value = 'Editar Paciente';
    v1.value = true;
}


const confirm = useConfirm();
const eliminar = (item) => {
confirm.require({
  message: '¿Seguro que quieres eliminar el paciente?',
  icon: 'pi pi-exclamation-triangle',
  acceptClass: 'p-button-danger',
  acceptLabel: 'Si',
  accept: () => {
    pacienteStore.deletePaciente(item.Dni);
  }
})
}
</script>


<template>
    <div class ="all">

    
    <h1>Pacientes</h1>
    <h1 v-if="pacienteStore.pacientes==null">Cargando...</h1>
<div v-else>
       <div class="card">
              <Toolbar class="mb-6">
                     <template #start>
                            <Button label ="Nuevo" severity="success" icon="pi pi-plus" class ="mr-2" v-on:click="añadir()"/>
                     </template>
                     <template #end>
                            <InputText id= "filtro" v-model="filters['global'].value" placeholder="Buscar..." />
                     </template>
              </Toolbar>
       </div>
       <DataTable ref ="dt" :value="pacienteStore.pacientes"
       :paginator = "true"
       :rows = "10"
       :filters = "filters"
       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 20]"
                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} pacientes">

       <Column field="Dni" header="Dni" sortable style="width:8rem"></Column>
       <Column field="Nombre" header="Nombre" sortable style="width:16rem"></Column>
       <Column field="Telefono" header="Telefono" sortable style="width:8rem"></Column>
       <Column field="Email" header="Email" sortable style="width:15rem"></Column>
       <Column field="Direccion" header="Direccion" sortable style="width:15rem"></Column>
       <Column style ="width: 4rem" header="Acciones" >
            <template #body="slotProps">
                <div class="columnIconos">
                     <Button icon="pi pi-pencil" outlined rounded class ="iconButton mr-2" v-on:click="editar(slotProps.data)" ></Button>
                     <Button icon ="pi pi-trash" outlined rounded severity="danger"class="iconButton" v-on:click="eliminar(slotProps.data)"></Button>
                     <Button icon="pi pi-pencil" outlined rounded class ="iconButton mr-2" v-on:click="editar(slotProps.data)" ></Button>
                     <Button icon ="pi pi-trash" outlined rounded severity="danger" class="iconButton" v-on:click="eliminar(slotProps.data)"></Button>
                     <!--   pi-calendar-plus para turnos,  pi-clipboard para tratamientos, pi-dollar para pagos  pi-backward para volver atras -->
                </div>
            </template>
       </Column>
       </DataTable>
</div>
       <ConfirmDialog v-model="eliminar"></ConfirmDialog>
       <FormPacientes :v="v" :paciente="paciente" :isNew="isNew" :titulo="titulo"></FormPacientes>

    </div>
</template>


<style>

.all{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.columnIconos{
    height: 30px;
    display:flex;
    align-items: center;
}

.iconButton{
    flex-shrink : 0;
    margin-right: 5px;
        width: 30px; /* adjust the width as needed */
        height: 30px; /* adjust the height as needed */
}


</style>

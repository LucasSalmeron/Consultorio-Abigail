<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {ref, computed, reactive} from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import { usePacienteStore } from '../../Stores/pacientes';
import {useTratamientoStore} from '../../Stores/tratamientos';
import { useConfirm } from 'primevue/useconfirm';
import FormTratamientos from '../Formularios/FormTratamientos.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import { useRouter } from 'vue-router';


//TODO VER SI PODEMOS VOLVER A TENER DIVIDIDOS FORM DE GRILLA??? DEFINIR
const tratamientoStore = useTratamientoStore();
const pacienteStore = usePacienteStore();
const v1 = ref(false);
const v = computed(() => v1);

const filters = ref({global: {value: null, matchMode: 'contains'}});

let tratamiento = reactive({Id: '', Fecha: '', Presupuesto: '', Nombre: '', Descripcion: '', Paciente: ''});
const titulo = ref('Añadir Tratamiento');
const isNew = ref(false);

const añadir = () => {
       tratamiento.Id = tratamientoStore.getNewId();
       tratamiento.Fecha = '';
       tratamiento.Presupuesto = '';
       tratamiento.Nombre = '';
       tratamiento.Descripcion = '';
       tratamiento.Paciente = pacienteStore.selectedPaciente.Dni;
       titulo.value = 'Añadir Tratamiento';
       isNew.value = true;
       v1.value = true;
}
const editar = (item) => {
    tratamiento.Id = item.Id;
    tratamiento.Fecha = item.Fecha;
    tratamiento.Presupuesto = item.Presupuesto;
    tratamiento.Nombre = item.Nombre;
    tratamiento.Descripcion = item.Descripcion;
    tratamiento.Paciente = item.Paciente;
    isNew.value = false;
    titulo.value = 'Editar Tratamiento';
    v1.value = true;
}

const pagos = (item) => {
    pacienteStore.selectTratamiento(item.Id);
    router.push('/Pagos');
}

const confirm = useConfirm();
const eliminar = (item) => {
confirm.require({
  message: '¿Seguro que quieres eliminar el tratamiento?',
  icon: 'pi pi-exclamation-triangle',
  acceptClass: 'p-button-danger',
  acceptLabel: 'Si',
  accept: () => {
    tratamientoStore.deleteTratamiento(item.Id);
  }
})
}
</script>


<template>
    <div class ="all">

    
    <h1>Tratamientos</h1>
    <h1 v-if="tratamientoStore.tratamientos==null">Cargando...</h1>
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
       <DataTable ref ="dt" :value="tratamientoStore.tratamientos.filter(x => x.Paciente == pacienteStore.selectedPaciente.Dni)" 
       :paginator = "true"
       :rows = "10"
       :filters = "filters"
       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 20]"
                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} tratamientos">
       <Column field="Paciente" header="Paciente" sortable style="width:16rem"></Column>
       <Column field="Id" header="Id" sortable style="width:8rem"></Column>
       <Column field="Fecha" header="Fecha" sortable style="width:8rem"></Column>
       <Column field="Presupuesto" header="Presupuesto" sortable style="width:8rem"></Column>
       <Column field="Nombre" header="Nombre" sortable style="width:16rem"></Column>
       <Column field="Descripcion" header="Descripcion" sortable style="width:16rem"></Column>
       
       <Column style ="width: 4rem" header="Acciones" >
            <template #body="slotProps">
                <div class="columnIconos">
                     <Button icon="pi pi-pencil" outlined rounded class ="iconButton mr-2" v-on:click="editar(slotProps.data)" ></Button>
                     <Button icon ="pi pi-trash" outlined rounded severity="danger"class="iconButton" v-on:click="eliminar(slotProps.data)"></Button>
                     <Button icon ="pi pi-dollar" outlined rounded severity="iconButton mr-2"class="iconButton" v-on:click="pagos(slotProps.data)"></Button>
                     <Button icon ="pi pi-trash" outlined rounded severity="danger"class="iconButton" v-on:click="eliminar(slotProps.data)"></Button>
                </div>
            </template>
       </Column>
       </DataTable>
</div>
       <ConfirmDialog v-model="eliminar"></ConfirmDialog>
       <FormTratamientos :v="v" :tratamiento="tratamiento" :isNew="isNew" :titulo="titulo"></FormTratamientos>

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



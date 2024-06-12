<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import {ref} from 'vue';
import InputText from 'primevue/inputtext';
defineProps({
    objetos: Object
})
const selected = ref();

const filters = ref({global: {value: null, matchMode: 'contains'}});
</script>



<template>
    <h1 v-if="$props.objetos==null">Cargando...</h1>
          <DataTable v-else :value="$props.objetos" showGridlines tableStyle="min-width: 10rem " 
          removableSort :sortField="Object.keys($props.objetos[0])[0]" :sortOrder="1"
          paginator :rows="25" :rowsPerPageOptions="[10, 25, 40]"  
          :globalFilterFields="[Object.keys($props.objetos[0])[0],Object.keys($props.objetos[0])[1]]" fliterDisplay="row" v-model:filters="filters" 
          v-model:selection="selected"  selectionMode="single"  :dataKey=Object.keys($props.objetos[0])[0]>
            <template #header>
                <InputText v-model="filters['global'].value" placeholder="Buscar" />
            </template>
                 <Column v-for="field in Object.keys($props.objetos[0])" :key="field" :field="field" :header="field" sortable ></Column>
          </DataTable>
</template>


<style>
.x{
    text-align: center;
    color: black;
}





</style>
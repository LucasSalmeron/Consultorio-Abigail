<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import {ref} from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useRouter } from 'vue-router'
import { simplePassing } from '../../Stores/simplePassing';
const sp = simplePassing();
const router = useRouter();
const p = defineProps({
    objetos: Object
})
const selected = ref();

const filters = ref({global: {value: null, matchMode: 'contains'}});

const editar = (item) =>{
    if(sp.parametros.sender==0){

        sp.parametros.objeto = selected.value;
        router.push({
            name: 'EditarPaciente',
        });
    }
}
</script>



<template>
    <h1 v-if="$props.objetos==null">Cargando...</h1>
          <DataTable class= "datatable"v-else :value="$props.objetos" showGridlines tableStyle="min-width: 10rem " 
          removableSort :sortField="Object.keys($props.objetos[0])[0]" :sortOrder="1"
          paginator :rows="25" :rowsPerPageOptions="[10, 25, 40]"  
          :globalFilterFields="[Object.keys($props.objetos[0])[0],Object.keys($props.objetos[0])[1]]" fliterDisplay="row" v-model:filters="filters" 
          v-model:selection="selected"  selectionMode="single"  
          
          :dataKey=Object.keys($props.objetos[0])[0]>
            <template #header>
                <InputText v-model="filters['global'].value" placeholder="Buscar" />
            </template>
                <Column class = "column" v-for="field in Object.keys($props.objetos[0])" :key="field" :field="field" :header="field" sortable ><button type="button" class="btn">X</button></Column>
                <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                    <template #body>
                        <Button type="button" icon="pi pi-pencil" rounded v-on:click="(_,item) => editar(item)"/>
                    </template>
                            
                </Column>
                <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                    <template #body>
                        <Button type="button" icon="pi pi-trash" rounded />
                    </template>
                            
                </Column>
          </DataTable>
</template>


<style>
.column{
    color: black;
    min-width: 200px;
}

.btn{
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

}




</style>
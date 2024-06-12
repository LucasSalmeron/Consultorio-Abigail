<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
defineProps({
    objetos: Object
})
</script>



<template>
    <h1 v-if="$props.objetos==null">Cargando...</h1>
          <DataTable v-else :value="$props.objetos" showGridlines tableStyle="min-width: 10rem ">
                 <Column v-for="field in Object.keys($props.objetos[0])" :key="field" :field="field" :header="field" ></Column>
          </DataTable>
</template>


<style>






</style>
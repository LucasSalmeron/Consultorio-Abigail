<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps({
    objeto: Object,
    retorno: Function
})
const o = props.objeto;
const r = props.retorno;
function submit (){
    r(o);
}

</script>

<template>
    <form   v-for="(field, index) in Object.keys(o)" v-bind="o">
        <div class="div">
            <label class= "label" :key="index">{{field}}</label>
            <InputText  :key="field" v-model="o[field]" />
        </div>
    </form>

    <Button label="submit" v-on:click="submit">Submit</Button>
</template>


<style>

.label{
    font-weight: bold;
    color:black;
    text-align: left;
}
.div{
    display: flex;
    flex-direction: column;
}



</style>
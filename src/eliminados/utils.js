import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUtils = defineStore('utils', () =>  {

    const _visibilidadForm = ref(false);

    const toggleVisibilidadForm = (value) => {
        _visibilidadForm.value = value
    }
    const visibilidadForm = computed(() => _visibilidadForm.value);


    return {visibilidadForm, toggleVisibilidadForm}

})
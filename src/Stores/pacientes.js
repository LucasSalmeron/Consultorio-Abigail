import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'

export const usePacienteStore = defineStore('pacientes', () =>  {
    const _pacientes = ref([{
        Dni: 0,
        Nombre: "",
        Telefono: "",
        Email: "",
        Direccion: "",
      }])
    const _isLoading = ref(false);

    const _selectedProduct = ref("");

    const fetchPacientes = async ()=> {
        try{
            _isLoading.value = true;
            console.log("buscando");
            const {data: pList} = await axios.get(`http://localhost:3000/buscarPacientes`);
            if(pList) {
                _pacientes.value = pList;
                _isLoading.value = false;
            }
        } catch (error) {
            console.log(error)
            _isLoading.value = false;
        }

    }

    const addPaciente= async (paciente) => {
        try{
            const data = await axios.post(`http://localhost:3000/sumarPaciente/`+paciente.Dni+`/`+paciente.Nombre+`/`+paciente.Telefono+`/`+paciente.Email+`/`+paciente.Direccion);
            if(data){
                fetchPacientes();
                return true;
            }
        } catch (error) {
            console.log(error)
        }

    }


    fetchPacientes();
    

    const pacientes = computed(() => _pacientes.value);

    const isLoading = computed(() => _isLoading.value);

    const selectedProduct = computed(() => _selectedProduct.value);

    return { fetchPacientes,addPaciente, pacientes, isLoading, selectedProduct }
  })
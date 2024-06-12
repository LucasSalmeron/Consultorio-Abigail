import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'

export const usePacienteStore = defineStore('pacientes', () =>  {
    const _pacientes = ref([{
        Dni: null,
        Nombre: null,
        Telefono: null,
        Email: null,
        Direccion: null,
      }])
    const _isLoading = ref(false);

    const _selectedPaciente = ref("");

    const fetchPacientes = async ()=> {
        try{
            _isLoading.value = true;
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

    const searchPacienteDni= async (dni) => {
        try{
          
            
             const data= {
                    Dni: Dni
                }
           
            const {data: p} = axios.post(`http://localhost:3000/buscarPacientexDNI/`,data);
            if(p){
                _selectedPaciente.value = p;
                return p;
            }
        } catch (error) {
            console.log(error)
        }

    }

    const addPaciente= async (paciente) => {
        try{
           
            
             const data= {
                    Dni: paciente.Dni,
                    Nombre: paciente.Nombre,
                    Telefono: paciente.Telefono,
                    Email: paciente.Email,
                    Direccion: paciente.Direccion
                }
           
            const d = axios.post(`http://localhost:3000/sumarPaciente/`,data);
            if(d){
                fetchPacientes();
                return true;
            }
        } catch (error) {
            console.log(error)
        }

    }
    const editPaciente= async (paciente) => {
        try{
            
             const data= {
                    Dni: paciente.Dni,
                    Nombre: paciente.Nombre,
                    Telefono: paciente.Telefono,
                    Email: paciente.Email,
                    Direccion: paciente.Direccion
                }
           
            const d = axios.post(`http://localhost:3000/editarPaciente/`,data);
            if(d){
                fetchPacientes();
                return true;
            }
        } catch (error) {
            console.log(error)
        }

    }
    const deletePaciente= async (dni) => {

        try{
            
            const data= {
                   Dni: dni,
               }
          
           const d = axios.post(`http://localhost:3000/eliminarPaciente/`,data);
           if(d){
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



    const selectedPaciente = computed(() => _selectedPaciente.value);

    return { fetchPacientes,addPaciente,editPaciente,deletePaciente, searchPacienteDni, pacientes, isLoading, selectedPaciente }
  })
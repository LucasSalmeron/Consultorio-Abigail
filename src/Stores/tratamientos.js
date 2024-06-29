import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'

export const useTratamientoStore = defineStore('Tratamientos', () =>  {
    const _tratamientos = ref([{
        Dni: null,
        Nombre: null,
        Telefono: null,
        Email: null,
        Direccion: null,
      }])
    const _isLoading = ref(false);

    const _selectedTratamiento = ref("");

    const fetchTratamientos = async ()=> {
        try{
            _isLoading.value = true;
            const {data: pList} = await axios.get(`http://localhost:3000/buscarTratamientos`);
            if(pList) {
                _tratamientos.value = pList;
                _isLoading.value = false;
            }
        } catch (error) {
            console.log(error)
            _isLoading.value = false;
        }

    }

    const searchTratamientoId= async (id) => {
        try{
          
            
             const data= {
                    Id: id
                }
           
            const {data: p} = axios.post(`http://localhost:3000/buscarTratamientoxID/`,data);
            if(p){
                _selectedTratamiento.value = p;
                return p;
            }
        } catch (error) {
            console.log(error)
        }

    }
    const searchTratamientosDni = async(dni) =>{
        try{
          
            
            const data= {
                   Dni: dni
               }
          
           const {data: p} = axios.post(`http://localhost:3000/buscarTratamientosPorDni/`,data);
           if(p){
               _selectedTratamiento.value = p;
               return p;
           }
       } catch (error) {
           console.log(error)
       }
    }
    

    const addTratamiento= async (tratamiento) => {
        try{
           
            
             const data= {
                    Id: tratamiento.Id,
                    Fecha: tratamiento.Fecha,
                    Presupuesto: tratamiento.Presupuesto,
                    Nombre: tratamiento.Nombre,
                    Descripcion: tratamiento.Descripcion,
                    Paciente: tratamiento.Paciente
                }
           
            const d = axios.post(`http://localhost:3000/sumarTratamiento/`,data);
            if(d){
                fetchTratamientos();
                return true;
            }
        } catch (error) {
            console.log(error)
        }

    }
    const editTratamiento= async (tratamiento) => {
        try{
            
             const data= {
                Id: tratamiento.Id,
                Fecha: tratamiento.Fecha,
                Presupuesto: tratamiento.Presupuesto,
                Nombre: tratamiento.Nombre,
                Descripcion: tratamiento.Descripcion,
                Paciente: tratamiento.Paciente
                }
           
            const d = axios.post(`http://localhost:3000/editarTratamiento/`,data);
            if(d){
                fetchTratamientos();
                return true;
            }
        } catch (error) {
            console.log(error)
        }

    }
    const deleteTratamiento= async (id) => {

        try{
            
            const data= {
                   Id: id,
               }
          
           const d = axios.post(`http://localhost:3000/eliminarTratamiento/`,data);
           if(d){
               fetchTratamientos();
               return true;
           }
       } catch (error) {
           console.log(error)
       }

    }

    fetchTratamientos();
    

    const tratamientos = computed(() => _tratamientos.value);

    const isLoading = computed(() => _isLoading.value);



    const selectedTratamiento = computed(() => _selectedTratamiento.value);

    return { fetchTratamientos,addTratamiento,editTratamiento,deleteTratamiento, searchTratamientoId, tratamientos, isLoading, selectedTratamiento }
  })
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'

export const usePagoStore = defineStore('Pagos', () =>  {
    const _pagos = ref([{
        Dni: null,
        Nombre: null,
        Telefono: null,
        Email: null,
        Direccion: null,
      }])
    const _isLoading = ref(false);

    const _selectedPago = ref("");

    const fetchPagos = async ()=> {
        try{
            _isLoading.value = true;
            const {data: pList} = await axios.get(`http://localhost:3000/buscarPagos`);
            if(pList) {
                _pagos.value = pList;
                _isLoading.value = false;
            }
        } catch (error) {
            console.log(error)
            _isLoading.value = false;
        }

    }

    const searchPagoId= async (id) => {
        try{
          
            
             const data= {
                    Id: id
                }
           
            const {data: p} = axios.post(`http://localhost:3000/buscarPagoxID/`,data);
            if(p){
                _selectedPago.value = p;
                return p;
            }
        } catch (error) {
            console.log(error)
        }

    }
    const searchPagosPorTratamiento = async(idTratamiento) =>{
        try{
          
            
            const data= {
                   Tratamiento: idTratamiento
               }
          
           const {data: p} = axios.post(`http://localhost:3000/buscarPagosPorTratamiento/`,data);
           if(p){
               _selectedPago.value = p;
               return p;
           }
       } catch (error) {
           console.log(error)
       }
    }
    

    const addPago= async (pago) => {
        try{
           
            
             const data= {
                    Id: pago.Id,
                    Fecha: pago.Fecha,
                    Monto: pago.Monto,
                    FormaPago: pago.FormaPago,
                    Detalle: pago.Detalle,
                    Tratamiento: pago.Tratamiento
                }
           
            const d = axios.post(`http://localhost:3000/sumarPago/`,data);
            if(d){
                fetchPagos();
                return true;
            }
        } catch (error) {
            console.log(error)
        }

    }
    const editPago= async (pago) => {
        try{
            
             const data= {
                Id: pago.Id,
                Fecha: pago.Fecha,
                Monto: pago.Monto,
                FormaPago: pago.FormaPago,
                Detalle: pago.Detalle,
                Tratamiento: pago.Tratamiento
                }
           
            const d = axios.post(`http://localhost:3000/editarPago/`,data);
            if(d){
                fetchPagos();
                return true;
            }
        } catch (error) {
            console.log(error)
        }

    }
    const deletePago= async (id) => {

        try{
            
            const data= {
                   Id: id,
               }
          
           const d = axios.post(`http://localhost:3000/eliminarPago/`,data);
           if(d){
               fetchPagos();
               return true;
           }
       } catch (error) {
           console.log(error)
       }

    }

    fetchPagos();
    

    const pagos = computed(() => _pagos.value);

    const isLoading = computed(() => _isLoading.value);



    const selectedPago = computed(() => _selectedPago.value);

    return { fetchPagos,addPago,editPago,deletePago, searchPagoId, pagos, isLoading, selectedPago }
  })
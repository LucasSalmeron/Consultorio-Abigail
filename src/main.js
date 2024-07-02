import { createApp } from 'vue'
import 'primevue/resources/themes/lara-light-amber/theme.css'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
export const pinia= createPinia();
import {createWebHistory,createRouter} from 'vue-router'
import Pacientes from './Views/Pacientes.vue'
import Tratamientos from './Views/Tratamientos.vue'
import Pagos from './Views/Pagos.vue'
import Formulario from './components/Formularios/Formulario.vue'
import "primeicons/primeicons.css";
const routes  =[
    {path: '/', component: Pacientes},
    {path: '/EditarPaciente', name:'EditarPaciente', props:true,component: Formulario, params:{Object}},
    {path:'/Tratamientos', component: Tratamientos},
    {path:'/Pagos', component: Pagos}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
createApp(App).use(pinia).use(PrimeVue).use(router).mount('#app')

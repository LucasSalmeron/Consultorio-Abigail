import { createApp } from 'vue'
import 'primevue/resources/themes/lara-light-amber/theme.css'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
export const pinia= createPinia();
import {createWebHistory,createRouter} from 'vue-router'
import ConfirmationService from 'primevue/confirmationservice';
import Pacientes from './Views/Pacientes.vue'
import Tratamientos from './Views/Tratamientos.vue'
import Pagos from './Views/Pagos.vue'
import "primeicons/primeicons.css";

const routes  =[
    {path: '/', component: Pacientes},
    {path:'/Tratamientos', component: Tratamientos},
    {path:'/Pagos', component: Pagos}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
createApp(App).use(pinia).use(PrimeVue).use(router).use(ConfirmationService).mount('#app')

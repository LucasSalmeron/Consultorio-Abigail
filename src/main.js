import { createApp } from 'vue'
import 'primevue/resources/themes/lara-light-amber/theme.css'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
export const pinia= createPinia();
import {createWebHistory,createRouter} from 'vue-router'
import ConfirmationService from 'primevue/confirmationservice';
import GrillaPacientes from './components/Grillas/GrillaPacientes.vue'
import GrillaTratamientos from './components/Grillas/GrillaTratamientos.vue'
import Pagos from './Views/Pagos.vue'
import "primeicons/primeicons.css";

const routes  =[
    {path: '/', component: GrillaPacientes},
    {path:'/Tratamientos', component: GrillaTratamientos},
    {path:'/Pagos', component: Pagos}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
createApp(App).use(pinia).use(PrimeVue).use(router).use(ConfirmationService).mount('#app')

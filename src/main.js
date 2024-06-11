import { createApp } from 'vue'
import 'primevue/resources/themes/lara-light-amber/theme.css'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
export const pinia= createPinia();
createApp(App).use(pinia).use(PrimeVue).mount('#app')

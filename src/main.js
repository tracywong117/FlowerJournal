import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'
import Home from './views/Home.vue'
import Trial from './views/Trial.vue'
import Preview from './views/Preview.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/trial',
    name: 'Trial',
    component: Trial,
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview,
  }
]

const router = createRouter({
  history: createWebHistory('/FlowerJournalApp/'),
  routes,
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')

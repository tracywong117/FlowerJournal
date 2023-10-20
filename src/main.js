import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]
 
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
 
const app = createApp(App)
app.use(router)
app.mount('#app')

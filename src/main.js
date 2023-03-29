import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from './components/HomeComponent'
import DupaComponent from './components/DupaComponent'
import App from './App'
import EditBookComponent from "@/components/EditBookComponent";
import CreateBookComponent from "@/components/CreateBookComponent";

const routes = [
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/dupa', name: 'Dupa', component: DupaComponent },
    { path: '/edit-book/:id', name: 'EditBook', component: EditBookComponent },
    { path: '/create-book', name: 'CreateBook', component: CreateBookComponent }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')

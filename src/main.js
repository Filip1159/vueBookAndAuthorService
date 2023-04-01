import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from './components/HomeComponent'
import DupaComponent from './components/DupaComponent'
import App from './App'
import EditBookComponent from "@/components/EditBookComponent";
import CreateBookComponent from "@/components/CreateBookComponent";

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/dupa', name: 'Dupa', component: DupaComponent },
    { path: '/edit-book/:id', name: 'EditBook', component: EditBookComponent },
    { path: '/create-book', name: 'CreateBook', component: CreateBookComponent }
]


const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

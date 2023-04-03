import HomeComponent from "@/components/HomeComponent.vue";
import DupaComponent from "@/components/DupaComponent.vue";
import EditBookComponent from "@/components/EditBookComponent.vue";
import CreateBookComponent from "@/components/CreateBookComponent.vue";
import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/dupa', name: 'Dupa', component: DupaComponent },
    { path: '/edit-book/:id', name: 'EditBook', component: EditBookComponent },
    { path: '/create-book', name: 'CreateBook', component: CreateBookComponent }
]

export const router = new VueRouter({
    routes
})

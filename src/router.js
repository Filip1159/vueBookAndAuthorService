import HomeComponent from "@/components/HomeComponent.vue";
import EditCarComponent from "@/components/EditCarComponent.vue";
import CreateCarComponent from "@/components/CreateCarComponent.vue";
import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/edit-car/:id', name: 'EditCar', component: EditCarComponent },
    { path: '/create-car', name: 'CreateCar', component: CreateCarComponent }
]

export const router = new VueRouter({
    routes
})

import HomeComponent from "@/components/HomeComponent.vue";
import EditCarComponent from "@/components/EditCarComponent.vue";
import CreateCarComponent from "@/components/CreateCarComponent.vue";
import VueRouter from "vue-router";
import Vue from "vue";
import EditOwnerComponent from "@/components/EditOwnerComponent.vue";
import CreateOwnerComponent from "@/components/CreateOwnerComponent.vue";
import OwnerListComponent from "@/components/OwnerListComponent.vue";

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/owners', name: 'OwnerList', component: OwnerListComponent },
    { path: '/edit-car/:id', name: 'EditCar', component: EditCarComponent },
    { path: '/create-car', name: 'CreateCar', component: CreateCarComponent },
    { path: '/edit-owner', name: 'EditOwner', component: EditOwnerComponent },
    { path: '/create-owner', name: 'CreateOwner', component: CreateOwnerComponent },
]

export const router = new VueRouter({
    routes
})

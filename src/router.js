import EditCarComponent from "@/components/car/EditCarComponent.vue";
import CreateCarComponent from "@/components/car/CreateCarComponent.vue";
import VueRouter from "vue-router";
import Vue from "vue";
import EditOwnerComponent from "@/components/owner/EditOwnerComponent.vue";
import CreateOwnerComponent from "@/components/owner/CreateOwnerComponent.vue";
import OwnerListComponent from "@/components/owner/OwnerListComponent.vue";
import AuthorsComponent from "@/components/AuthorsComponent.vue";
import CarListComponent from "@/components/car/CarListComponent.vue";
import InspectionListComponent from "@/components/inspection/InspectionListComponent.vue";

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'CarListComponent', component: CarListComponent },
    { path: '/owners', name: 'OwnerList', component: OwnerListComponent },
    { path: '/inspections', name: 'InspectionList', component: InspectionListComponent },
    { path: '/edit-car/:id', name: 'EditCar', component: EditCarComponent },
    { path: '/create-car', name: 'CreateCar', component: CreateCarComponent },
    { path: '/edit-owner', name: 'EditOwner', component: EditOwnerComponent },
    { path: '/create-owner', name: 'CreateOwner', component: CreateOwnerComponent },
    { path: '/authors', name: 'Authors', component: AuthorsComponent }
]

export const router = new VueRouter({
    routes
})

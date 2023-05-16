import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex)

const HEADERS = {'Content-Type': 'application/json'}

export const store = new Vuex.Store({
    state: {
        carBeingUpdated: {
            model: '',
            year: 0,
            owners: []
        },
        owners: [],
        cars: [],
        authors: ''
    },
    getters: {},
    mutations: {
        SET_CARS(state, cars) {
            state.cars = cars
            state.cars.sort(function (b1, b2) { return b2.id - b1.id })
        },
        SET_OWNERS(state, owners) {
            state.owners = owners
        },
        SET_AUTHORS(state, authors) {
            state.authors = authors
        },
        SET_CAR_BEING_UPDATED(state, carBeingUpdated) {
            state.carBeingUpdated = carBeingUpdated
        },
        REMOVE_CAR(state, carIdToRemove) {
            state.cars = state.cars.filter(car => car.id !== carIdToRemove)
            state.owners.forEach(owner => owner.carIds.filter(carId => carId !== carIdToRemove))
        },
        UPDATE_CAR(state, carToUpdate) {
            const carFromStore = state.cars.filter(car => car.id === carToUpdate.id)[0]
            carFromStore.model = carToUpdate.model
            carFromStore.year = carToUpdate.year
            carFromStore.ownerIds = carToUpdate.ownerIds
            const updatedOwnersFromStore = state.owners.filter(owner => carFromStore.ownerIds.includes(owner.id))
            updatedOwnersFromStore.forEach(owner => !owner.carIds.includes(carToUpdate.id) ?? owner.carIds.push(carToUpdate.id))
        },
        CREATE_CAR(state, carToCreate) {
            state.cars.push(carToCreate)
            const updatedOwnersFromStore = state.owners.filter(owner => carToCreate.ownerIds.includes(owner.id))
            updatedOwnersFromStore.forEach(owner => owner.carIds.push(carToCreate.id))
            state.cars.sort(function (b1, b2) { return b2.id - b1.id })
        },
        CREATE_OWNER(state, ownerToCreate) {
            state.owners.push(ownerToCreate)
            const updatedCarsFromStore = state.cars.filter(car => ownerToCreate.carIds.includes(car.id))
            updatedCarsFromStore.forEach(car => car.ownerIds.push(ownerToCreate.id))
            state.owners.sort(function (b1, b2) { return b2.id - b1.id })
        },
        UPDATE_OWNER(state, ownerToUpdate) {
            const ownerFromStore = state.owners.filter(owner => owner.id === ownerToUpdate.id)[0]
            ownerFromStore.name = ownerToUpdate.name
            ownerFromStore.surname = ownerToUpdate.surname
            ownerFromStore.carIds = ownerToUpdate.carIds
            const updatedCarsFromStore = state.cars.filter(car => ownerFromStore.carIds.includes(car.id))
            updatedCarsFromStore.forEach(car => !car.ownerIds.includes(ownerToUpdate.id) ?? car.ownerIds.push(ownerToUpdate.id))
        },
        SET_OWNER_BEING_UPDATED(state, ownerToUpdate) {
            state.ownerBeingUpdated = ownerToUpdate
        },
        REMOVE_OWNER(state, ownerIdToRemove) {
            state.owners = state.owners.filter(owner => owner.id !== ownerIdToRemove)
            state.cars.forEach(car => car.ownerIds.filter(ownerId => ownerId !== ownerIdToRemove))
        }
    },
    actions: {
        setAuthors({commit}, authors) {
            commit('SET_AUTHORS', authors)
        },
        setCars({commit}, cars) {
            commit('SET_CARS', cars)
        },
        setOwners({commit}, owners) {
            commit('SET_OWNERS', owners)
        },
        removeCar({commit}, carId) {
            console.log(1)
            fetch(`http://localhost:9000/car/${carId}`, {method: 'delete'})
                .then(r => {
                    console.log(2)
                    if (r.status === 200) commit('REMOVE_CAR', carId)
                })
        },
        removeOwner({commit}, ownerId) {
            console.log(1)
            fetch(`http://localhost:9000/owner/${ownerId}`, {method: 'delete'})
                .then(r => {
                    console.log(2)
                    if (r.status === 200) commit('REMOVE_OWNER', ownerId)
                })
        },
        updateCar({commit}, newlyUpdatedCar) {
            console.log(newlyUpdatedCar)
            fetch(`http://localhost:9000/car/${newlyUpdatedCar.id}`,
                {
                    method: 'put',
                    headers: HEADERS,
                    body: JSON.stringify({
                        model: newlyUpdatedCar.model,
                        year: newlyUpdatedCar.year,
                        ownerIds: newlyUpdatedCar.ownerIds
                    })
                })
                .then(r => {
                    console.log('upd')
                    if (r.status === 200) commit('UPDATE_CAR', newlyUpdatedCar)
                })
        },
        createCar({commit}, carToCreate) {
            fetch(`http://localhost:9000/car`, {
                method: 'post',
                headers: HEADERS,
                body: JSON.stringify(carToCreate)
            })
                .then(async r => {
                    if (r.status === 201) commit('CREATE_CAR', await r.json())
                })
        },
        createOwner({commit}, ownerToCreate) {
            fetch(`http://localhost:9000/owner`, {
                method: 'post',
                headers: HEADERS,
                body: JSON.stringify(ownerToCreate)
            })
                .then(async r => {
                    if (r.status === 201) commit('CREATE_OWNER', await r.json())
                })
        },
        updateOwner({commit}, newlyUpdatedOwner) {
            console.log(newlyUpdatedOwner)
            fetch(`http://localhost:9000/owner/${newlyUpdatedOwner.id}`,
                {
                    method: 'put',
                    headers: HEADERS,
                    body: JSON.stringify({
                        name: newlyUpdatedOwner.name,
                        surname: newlyUpdatedOwner.surname,
                        carIds: newlyUpdatedOwner.carIds
                    })
                })
                .then(r => {
                    console.log('upd')
                    if (r.status === 200) commit('UPDATE_OWNER', newlyUpdatedOwner)
                })
        },
        getAuthors() {

        }
    }
})

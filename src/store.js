import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex)

const HEADERS = {'Content-Type': 'application/json'}
const JSON_FORMAT_HEADER = {Accept: 'application/json'}
const XML_FORMAT_HEADER = {Accept: 'application/xml'}

const SERVER_IP = 'localhost'

export const store = new Vuex.Store({
    state: {
        carBeingUpdated: {
            brand: '',
            model: '',
            year: 0,
            firstRegistration: null,
            owners: []
        },
        owners: [],
        cars: [],
        inspections: [],
        authors: '',
        bodyFormat: 'JSON'
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
        SET_INSPECTIONS(state, inspections) {
            state.inspections = inspections
        },
        SET_AUTHORS(state, authors) {
            state.authors = authors
        },
        SET_CAR_BEING_UPDATED(state, carBeingUpdated) {
            state.carBeingUpdated = carBeingUpdated
        },
        REMOVE_CAR(state, carIdToRemove) {
            state.cars = state.cars.filter(car => car.id !== carIdToRemove)
            state.inspections = state.inspections.filter(i => i.carId !== carIdToRemove)
            state.owners.forEach(owner => owner.carIds.filter(carId => carId !== carIdToRemove))
        },
        UPDATE_CAR(state, carToUpdate) {
            const carFromStore = state.cars.filter(car => car.id === carToUpdate.id)[0]
            carFromStore.brand = carToUpdate.brand
            carFromStore.model = carToUpdate.model
            carFromStore.year = carToUpdate.year
            carFromStore.firstRegistration = carToUpdate.firstRegistration
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
            ownerFromStore.dateOfBirth = ownerToUpdate.dateOfBirth
            ownerFromStore.isPremiumCustomer = ownerToUpdate.isPremiumCustomer
            ownerFromStore.carIds = ownerToUpdate.carIds
            const updatedCarsFromStore = state.cars.filter(car => ownerFromStore.carIds.includes(car.id))
            updatedCarsFromStore.forEach(car => !car.ownerIds.includes(ownerToUpdate.id) ?? car.ownerIds.push(ownerToUpdate.id))
        },
        CREATE_INSPECTION(state, inspectionToCreate) {
            state.inspections.push(inspectionToCreate)
        },
        UPDATE_INSPECTION(state, inspectionToUpdate) {
            const inspectionFromStore = state.inspections.filter(i => i.id === inspectionToUpdate.id)[0]
            inspectionFromStore.date = inspectionToUpdate.date
            inspectionFromStore.mileage = inspectionToUpdate.mileage
            inspectionFromStore.comments = inspectionToUpdate.comments
            inspectionFromStore.isPositive = inspectionToUpdate.isPositive
            inspectionFromStore.carId = inspectionToUpdate.carId
        },
        REMOVE_INSPECTION(state, inspectionIdToRemove) {
            state.inspections = state.inspections.filter(i => i.id !== inspectionIdToRemove)
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
        toggleBodyFormat({commit}) {
            commit('TOGGLE_BODY_FORMAT')
        },
        setCars({commit}, cars) {
            commit('SET_CARS', cars)
        },
        setInspections({commit}, inspections) {
            commit('SET_INSPECTIONS', inspections)
        },
        setOwners({commit}, owners) {
            commit('SET_OWNERS', owners)
        },
        removeCar({commit, state}, carId) {
            console.log(1)
            fetch(`http://${SERVER_IP}:9000/car/${carId}`, {
                method: 'delete'
            })
                .then(r => {
                    console.log(2)
                    if (r.status === 204) commit('REMOVE_CAR', carId)
                })
        },
        removeOwner({commit, state}, ownerId) {
            console.log(1)
            fetch(`http://${SERVER_IP}:9000/owner/${ownerId}`, {
                method: 'delete'
            })
                .then(r => {
                    console.log(2)
                    if (r.status === 204) commit('REMOVE_OWNER', ownerId)
                })
        },
        updateCar({commit, state}, newlyUpdatedCar) {
            console.log(newlyUpdatedCar)
            fetch(`http://${SERVER_IP}:9000/car/${newlyUpdatedCar.id}`,
                {
                    method: 'put',
                    headers: HEADERS,
                    body: JSON.stringify({
                        brand: newlyUpdatedCar.brand,
                        model: newlyUpdatedCar.model,
                        year: newlyUpdatedCar.year,
                        firstRegistration: newlyUpdatedCar.firstRegistration,
                        ownerIds: newlyUpdatedCar.ownerIds
                    })
                })
                .then(r => {
                    console.log('upd')
                    if (r.status === 200) commit('UPDATE_CAR', newlyUpdatedCar)
                })
        },
        createCar({commit, state}, carToCreate) {
            fetch(`http://${SERVER_IP}:9000/car`, {
                method: 'post',
                headers: HEADERS,
                body: JSON.stringify(carToCreate)
            })
                .then(async r => {
                    if (r.status === 201) commit('CREATE_CAR', await r.json())
                })
        },
        createOwner({commit, state}, ownerToCreate) {
            fetch(`http://${SERVER_IP}:9000/owner`, {
                method: 'post',
                headers: HEADERS,
                body: JSON.stringify(ownerToCreate)
            })
                .then(async r => {
                    if (r.status === 201) commit('CREATE_OWNER', await r.json())
                })
        },
        updateOwner({commit, state}, newlyUpdatedOwner) {
            console.log(newlyUpdatedOwner)
            fetch(`http://${SERVER_IP}:9000/owner/${newlyUpdatedOwner.id}`,
                {
                    method: 'put',
                    headers: HEADERS,
                    body: JSON.stringify({
                        name: newlyUpdatedOwner.name,
                        surname: newlyUpdatedOwner.surname,
                        dateOfBirth: newlyUpdatedOwner.dateOfBirth,
                        isPremiumCustomer: newlyUpdatedOwner.isPremiumCustomer,
                        carIds: newlyUpdatedOwner.carIds
                    })
                })
                .then(r => {
                    console.log('upd')
                    if (r.status === 200) commit('UPDATE_OWNER', newlyUpdatedOwner)
                })
        },
        createInspection({commit}, inspectionToCreate) {
            fetch(`http://${SERVER_IP}:9000/inspection`, {
                method: 'post',
                headers: HEADERS,
                body: JSON.stringify(inspectionToCreate)
            })
                .then(async r => {
                    if (r.status === 201) commit('CREATE_INSPECTION', await r.json())
                })
        },
        updateInspection({commit}, newlyUpdatedInspection) {
            fetch(`http://${SERVER_IP}:9000/inspection/${newlyUpdatedInspection.id}`, {
                method: 'put',
                headers: HEADERS,
                body: JSON.stringify({
                    date: newlyUpdatedInspection.date,
                    mileage: newlyUpdatedInspection.mileage,
                    comments: newlyUpdatedInspection.comments,
                    isPositive: newlyUpdatedInspection.isPositive,
                    carId: newlyUpdatedInspection.carId,
                })
            })
                .then(r => {
                    if (r.status === 200) commit('UPDATE_INSPECTION', newlyUpdatedInspection)
                })
        },
        removeInspection({commit}, inspectionId) {
            fetch(`http://${SERVER_IP}:9000/inspection/${inspectionId}`, {
                method: 'delete'
            })
                .then(r => {
                    if (r.status === 204) commit('REMOVE_INSPECTION', inspectionId)
                })
        }
    }
})

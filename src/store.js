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
        cars: []
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
        SET_CAR_BEING_UPDATED(state, carBeingUpdated) {
            state.carBeingUpdated = carBeingUpdated
        },
        REMOVE_CAR(state, carIdToRemove) {
            state.cars = state.cars.filter(car => car.id !== carIdToRemove)
        },
        UPDATE_CAR(state, carToUpdate) {
            const carFromStore = state.cars.filter(car => car.id === carToUpdate.id)[0]
            carFromStore.model = carToUpdate.model
            carFromStore.year = carToUpdate.year
            carFromStore.ownerIds = carToUpdate.ownerIds
        },
        CREATE_CAR(state, carToCreate) {
            state.cars.push(carToCreate)
            state.cars.sort(function (b1, b2) { return b2.id - b1.id })
        }
    },
    actions: {
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
        }
    }
})

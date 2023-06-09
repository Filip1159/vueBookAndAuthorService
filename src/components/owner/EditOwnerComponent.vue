<template>
    <form>
        <div class="formTitle">Edit owner</div>
        <div class="inputWrapper">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" v-model="ownerBeingUpdated.name"/>
        </div>
        <div class="inputWrapper">
            <label for="surname">Surname:</label>
            <input type="text" name="surname" id="surname" v-model="ownerBeingUpdated.surname"/>
        </div>
        <div class="inputWrapper">
          <label for="dateOfBirth">Date of birth:</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" v-model="ownerBeingUpdated.dateOfBirth"/>
        </div>
        <div class="inputWrapper">
          <label for="isPremium">Is premium:</label>
          <input type="checkbox" name="isPremium" id="isPremium" v-model="ownerBeingUpdated.isPremiumCustomer"/>
        </div>
        <multiselect
                placeholder="Cars"
                class="multiselect"
                v-model="selectedCars"
                :multiple="true"
                :options="carNames"
                label="carName"
                track-by="carName"
        >
        </multiselect>
        <div class="buttonsWrapper">
            <button @click="e => saveOwner(e)">Save</button>
            <router-link :to="{ name: 'Home' }">
                <button>Cancel</button>
            </router-link>
        </div>
    </form>
</template>

<script>

import Multiselect from "vue-multiselect";

export default {
    name: "EditOwnerComponent",
    props: ['id'],
    components: {Multiselect},

    data() {
        return {
            ownerBeingUpdated: {},
            selectedCars: []
        }
    },

    computed: {
        carNames() {
            return this.$store.state.cars.map(car => ({
                id: car.id,
                carName: `${car.model} ${car.year}`
            }))
        }
    },

    mounted() {
        this.ownerBeingUpdated = this.$store.state.owners.filter(owner => owner.id === this.$route.params.id)[0]
        const cars = this.$store.state.cars.filter(car => this.ownerBeingUpdated.carIds.includes(car.id))
        this.selectedCars = cars
            .map(car => ({
                id: car.id,
                carName: `${car.model} (${car.year})`
            }))
    },

    methods: {
        saveOwner: function (e) {
            e.preventDefault()
            const newlyUpdatedOwner = {
                id: this.ownerBeingUpdated.id,
                name: this.ownerBeingUpdated.name,
                surname: this.ownerBeingUpdated.surname,
                carIds: this.selectedCars.map(c => c.id)
            }
            this.$store.dispatch('updateOwner', newlyUpdatedOwner).then(() => {
                this.$router.push('/')
            })
        }
    }
}

</script>

<style scoped>
form {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.formTitle {
    font-size: 32px;
    font-weight: 700;
    align-self: flex-start;
    margin-left: 40px;
    margin-bottom: 40px;
}


.inputWrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
    font-size: 18px;
}

.buttonsWrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

button {
    padding: 5px 15px;
    width: 120px;
}

.multiselect {
    min-width: 400px;
    max-width: 400px;
    border: 2px solid black;
    border-radius: 4px;
    margin-bottom: 150px;
}
</style>
<template>
    <form @submit="e => createOwner(e)">
        <div class="formTitle">Create new owner</div>
        <div class="inputWrapper">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" v-model="owner.name"/>
        </div>
        <div class="inputWrapper">
            <label for="surname">Surname:</label>
            <input type="text" name="surname" id="surname" v-model="owner.surname"/>
        </div>
        <multiselect
                placeholder="Cars"
                class="multiselect"
                v-model="selectedCars"
                :multiple="true"
                :options="cars"
                label="carName"
                track-by="carName"
        >
        </multiselect>
        <div class="buttonsWrapper">
            <button @click="e => createOwner(e)">Save</button>
            <router-link :to="{ name: 'Home' }">
                <button>Cancel</button>
            </router-link>
        </div>
    </form>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
    name: "CreateOwnerComponent",
    components: {Multiselect},
    data() {
        return {
            owner: {},
            selectedCars: null,
            cars: []
        }
    },

    mounted() {
        this.cars = this.$store.state.cars
            .map(car => ({
                id: car.id,
                carName: `${car.model} (${car.year})`
            }))
    },

    methods: {
        createOwner: function (e) {
            e.preventDefault()
            const ownerToCreate = {
                name: this.owner.name,
                surname: this.owner.surname,
                carIds: this.selectedCars.map(c => c.id)
            }
            this.$store.dispatch('createOwner', ownerToCreate).then(() => {
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
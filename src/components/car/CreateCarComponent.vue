<template>
    <form @submit="e => createCar(e)">
        <div class="formTitle">Create new car</div>
      <div class="inputWrapper">
        <label for="brand">Brand:</label>
        <input type="text" name="brand" id="brand" v-model="car.brand"/>
      </div>
        <div class="inputWrapper">
            <label for="model">Model:</label>
            <input type="text" name="model" id="model" v-model="car.model"/>
        </div>
        <div class="inputWrapper">
            <label for="year">Year:</label>
            <input type="text" name="year" id="year" v-model="car.year"/>
        </div>
      <div class="inputWrapper">
        <label for="firstRegistration">First registration:</label>
        <input type="date" name="firstRegistration" id="firstRegistration" v-model="car.firstRegistration"/>
      </div>
        <multiselect
                placeholder="Owners"
                class="multiselect"
                v-model="selectedOwners"
                :multiple="true"
                :options="owners"
                label="fullName"
                track-by="fullName"
        >
        </multiselect>
        <div class="buttonsWrapper">
            <button @click="e => createCar(e)">Save</button>
            <router-link :to="{ name: 'CarListComponent' }">
                <button>Cancel</button>
            </router-link>
        </div>
    </form>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
    name: "CreateCarComponent",
    components: {Multiselect},
    data() {
        return {
            car: {},
            selectedOwners: null,
            owners: []
        }
    },

    mounted() {
        this.owners = this.$store.state.owners
            .map(owner => ({
                id: owner.id,
                fullName: `${owner.name} ${owner.surname}`
            }))
    },

    methods: {
        createCar: function (e) {
            e.preventDefault()
            const carToCreate = {
				brand: this.car.brand,
                model: this.car.model,
                year: this.car.year,
				firstRegistration: this.car.firstRegistration,
                ownerIds: this.selectedOwners ? this.selectedOwners.map(o => o.id) : []
            }
            this.$store.dispatch('createCar', carToCreate).then(() => {
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

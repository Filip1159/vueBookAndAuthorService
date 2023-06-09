<template>
    <form>
        <div class="formTitle">Edit car</div>
        <div class="inputWrapper">
          <label for="brand">Brand:</label>
          <input type="text" name="brand" id="brand" v-model="carBeingUpdated.brand"/>
        </div>
        <div class="inputWrapper">
            <label for="model">Model:</label>
            <input type="text" name="model" id="model" v-model="carBeingUpdated.model"/>
        </div>
        <div class="inputWrapper">
            <label for="year">Year:</label>
            <input type="text" name="year" id="year" v-model="carBeingUpdated.year"/>
        </div>
      <div class="inputWrapper">
        <label for="firstRegistration">First registration:</label>
        <input type="date" name="firstRegistration" id="firstRegistration" v-model="carBeingUpdated.firstRegistration"/>
      </div>
        <multiselect
                placeholder="Owners"
                class="multiselect"
                v-model="selectedOwners"
                :multiple="true"
                :options="ownerNames"
                label="fullName"
                track-by="fullName"
        >
        </multiselect>
        <div class="buttonsWrapper">
            <button @click="e => saveCar(e)">Save</button>
            <router-link :to="{ name: 'CarListComponent' }">
                <button>Cancel</button>
            </router-link>
        </div>
    </form>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
    name: "EditCarComponent",
    props: ['id'],
    components: {Multiselect},

    data() {
        return {
            carBeingUpdated: {},
            selectedOwners: []
        }
    },

    mounted() {
        this.carBeingUpdated = this.$store.state.cars.filter(car => car.id === this.$route.params.id)[0]
        const owners = this.$store.state.owners.filter(owner => this.carBeingUpdated.ownerIds.includes(owner.id))
        this.selectedOwners = owners.map(owner => ({
            id: owner.id,
            fullName: `${owner.name} ${owner.surname}`
        }))
    },

    computed: {
        ownerNames() {
            return this.$store.state.owners.map(owner => ({
                id: owner.id,
                fullName: `${owner.name} ${owner.surname}`
            }))
        }
    },

    methods: {
        saveCar: function (e) {
            e.preventDefault()
            const newlyUpdatedCar = {
                id: this.carBeingUpdated.id,
				brand: this.carBeingUpdated.brand,
                model: this.carBeingUpdated.model,
                year: this.carBeingUpdated.year,
				firstRegistration: this.carBeingUpdated.firstRegistration,
                ownerIds: this.selectedOwners.map(o => o.id)
            }
            this.$store.dispatch('updateCar', newlyUpdatedCar).then(() => {
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

<template>
    <div>
        <div class="heading">
            <div class="carListSpan">Car list</div>
			<router-link :to="{ name: 'CreateCar' }">
				<button class="newCarButton">+ New car</button>
			</router-link>
        </div>
        <table class="carListTable">
            <thead>
            <tr>
                <th class="brandTh">Brand</th>
                <th class="modelTh">Model</th>
                <th class="yearTh">Year</th>
                <th class="firstRegistrationTh">First registration</th>
                <th class="ownersTh">Owners</th>
                <th class="actionTh">Action</th>
            </tr>
            </thead>
            <tbody>
            <car v-for="car in carsList" :key="car.id" :car="car"/>
            </tbody>
        </table>
    </div>
</template>

<script>
import Car from './CarComponent.vue'

export default {
    name: 'CarListComponent',
    components: {Car},
    data() {
        return {
        }
    },

    computed: {
      carsList() {
        return this.$store.state.cars
      }
    }
}
</script>

<style scoped>
.carListSpan {
    font-size: 32px;
    font-weight: 700;
    align-self: flex-start;
    margin: 20px 40px;
}

.carListTable {
    margin: 30px auto;
    min-width: 70%;
}

thead {
    background-color: #42b983;
    font-size: 18px;
    border: 2px solid #42b983;
}

th {
    padding: 6px 25px;
}

.brandTh {
  width: 15%;
}

.modelTh {
    width: 15%;
}

.yearTh {
    width: 80px;
}

.firstRegistrationTh {
  width: 25%;
}

.ownersTh {
    width: 25%;
}

.actionTh {
    width: 100px;
}

.heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.newCarButton {
    padding: 5px 15px;
    width: 150px;
}

a {
    margin: auto 40px;
    display: block !important;
    text-decoration: none !important;
    color: black !important;
}

</style>
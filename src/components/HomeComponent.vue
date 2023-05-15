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
				<th class="modelTh">Model</th>
				<th class="yearTh">Year</th>
				<th class="ownersTh">Owners</th>
				<th class="actionTh">Action</th>
			</tr>
			</thead>
			<tbody>
			<car v-for="car in carsPage" :key="car.id" :car="car"/>
			</tbody>
		</table>
		<div class="navigation">
			<button class="navigationButton" :class="{active: canSwitchPreviousPage()}" @click="previousPage">&lt;</button>
			<span class="pageSpan">{{ pageNumber }}</span>
			<button class="navigationButton" :class="{active: canSwitchNextPage()}" @click="nextPage">&gt;</button>
		</div>
	</div>
</template>

<script>
import Car from './CarComponent.vue'

const paginate = (items, page, perPage = 5) => items.slice(perPage * (page - 1), perPage * page);

export default {
    name: 'HomeComponent',
    components: {Car},
	data() {
		return {
			pageNumber: 1,
		}
	},

	computed: {
		carsPage() {
			return paginate(this.$store.state.cars, this.pageNumber)
		},
		carsCount() {
			return this.$store.state.cars.length
		}
	},

	methods: {
		canSwitchNextPage() {
			return this.pageNumber !== Math.ceil(this.carsCount / 5)
		},
		canSwitchPreviousPage() {
			return this.pageNumber !== 1
		},
		nextPage() {
			if (this.canSwitchNextPage()) this.pageNumber++
		},
		previousPage() {
			if (this.canSwitchPreviousPage()) this.pageNumber--
		}
	}
}
</script>

<style scoped>
.carListSpan {
	font-size: 32px;
	font-weight: 700;
	align-self: flex-start;
	margin: 20px 0 40px 100px;
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

.modelTh {
	width: 30%;
}

.yearTh {
    width: 80px;
}

.ownersTh {
	width: 35%;
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

.navigation {
	position: absolute;
	bottom: 100px;
	left: 40%;
	right: 40%;
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.pageSpan {
	font-size: 20px;
	font-weight: 700;
	margin: 0 20px;
}

.navigationButton {
	opacity: 0.3;
}

.navigationButton.active {
	opacity: 1;
}

</style>
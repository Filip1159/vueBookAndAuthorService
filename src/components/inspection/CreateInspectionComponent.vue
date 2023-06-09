<template>
	<form @submit="e => createInspection(e)">
		<div class="formTitle">Create new inspection</div>
		<div class="inputWrapper">
			<label for="date">Date:</label>
			<input type="date" name="date" id="date" v-model="inspection.date"/>
		</div>
		<div class="inputWrapper">
			<label for="mileage">Mileage:</label>
			<input type="number" name="mileage" id="mileage" v-model="inspection.mileage"/>
		</div>
		<div class="inputWrapper">
			<label for="comments">Comments:</label>
			<input type="text" name="comments" id="comments" v-model="inspection.comments"/>
		</div>
		<div class="inputWrapper">
			<label for="isPositive">Is positive:</label>
			<input type="checkbox" name="isPositive" id="isPositive" v-model="inspection.isPositive"/>
		</div>
		<multiselect
			placeholder="Car"
			class="multiselect"
			v-model="selectedCar"
			:multiple="false"
			:options="cars"
			label="carName"
			track-by="carName"
		>
		</multiselect>
		<div class="buttonsWrapper">
			<button @click="e => createInspection(e)">Save</button>
			<router-link :to="{ name: 'InspectionList' }">
				<button>Cancel</button>
			</router-link>
		</div>
	</form>
</template>

<script>
import Multiselect from "vue-multiselect"

export default {
	name: "CreateInspectionComponent",
	components: {Multiselect},
	data() {
		return {
			inspection: {},
			selectedCar: null,
			cars: []
		}
	},

	mounted() {
		this.cars = this.$store.state.cars
			.map(car => ({
				id: car.id,
				carName: `${car.brand} ${car.model} (${car.year})`
			}))
	},

	methods: {
		createInspection: function (e) {
			e.preventDefault()
			const inspectionToCreate = {
				date: this.inspection.date,
				mileage: this.inspection.mileage,
				comments: this.inspection.comments,
				isPositive: this.inspection.isPositive,
				carId: this.selectedCar.id
			}
			this.$store.dispatch('createInspection', inspectionToCreate).then(() => {
				this.$router.push('/inspections')
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
	margin-bottom: 50px;
}
</style>
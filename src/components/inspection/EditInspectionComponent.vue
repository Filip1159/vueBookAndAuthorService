<template>
	<form>
		<div class="formTitle">Edit inspection</div>
		<div class="inputWrapper">
			<label for="date">Date:</label>
			<input type="date" name="date" id="date" v-model="inspectionBeingUpdated.date"/>
		</div>
		<div class="inputWrapper">
			<label for="mileage">Mileage:</label>
			<input type="number" name="mileage" id="mileage" v-model="inspectionBeingUpdated.mileage"/>
		</div>
		<div class="inputWrapper">
			<label for="comments">Comments:</label>
			<input type="text" name="comments" id="comments" v-model="inspectionBeingUpdated.comments"/>
		</div>
		<div class="inputWrapper">
			<label for="isPositive">Is positive:</label>
			<input type="checkbox" name="isPositive" id="isPositive" v-model="inspectionBeingUpdated.isPositive"/>
		</div>
		<multiselect
			placeholder="Cars"
			class="multiselect"
			v-model="selectedCar"
			:multiple="false"
			:options="carNames"
			label="carName"
			track-by="carName"
		>
		</multiselect>
		<div class="buttonsWrapper">
			<button @click="e => saveInspection(e)">Save</button>
			<router-link :to="{ name: 'InspectionList' }">
				<button>Cancel</button>
			</router-link>
		</div>
	</form>
</template>

<script>
import Multiselect from "vue-multiselect"

export default {
	name: "EditInspectionComponent",
	props: ['id'],
	components: {Multiselect},

	data() {
		return {
			inspectionBeingUpdated: {},
			selectedCar: null
		}
	},

	computed: {
		carNames() {
			return this.$store.state.cars.map(car => ({
				id: car.id,
				carName: `${car.brand} ${car.model} (${car.year})`
			}))
		}
	},

	mounted() {
		this.inspectionBeingUpdated = this.$store.state.inspections.filter(i => i.id === this.$route.params.id)[0]
		const car = this.$store.state.cars.filter(car => this.inspectionBeingUpdated.carId === car.id)[0]
		this.selectedCar = {
			id: car.id,
			carName: `${car.brand} ${car.model} (${car.year})`
		}
	},

	methods: {
		saveInspection: function (e) {
			e.preventDefault()
			console.log(this.inspectionBeingUpdated)
			const newlyUpdatedInspection = {
				id: this.inspectionBeingUpdated.id,
				date: this.inspectionBeingUpdated.date,
				mileage: this.inspectionBeingUpdated.mileage,
				comments: this.inspectionBeingUpdated.comments,
				isPositive: this.inspectionBeingUpdated.isPositive,
				carId: this.selectedCar.id
			}
			this.$store.dispatch('updateInspection', newlyUpdatedInspection).then(() => {
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
<template>
	<tr class="inspectionRow">
		<td class="date">{{ inspection.date }}</td>
		<td class="mileage">{{ inspection.mileage }}</td>
		<td class="comments">{{ inspection.comments }}</td>
		<td class="isPositive">{{ inspection.isPositive }}</td>
		<td class="car">{{ car }}</td>
		<td class="buttonsTd">
			<button @click="removeInspection(inspection.id)">Delete</button>
			<router-link :to="{ name: 'EditInspection', params: { id: inspection.id } }">
				<button>Edit</button>
			</router-link>
		</td>
	</tr>
</template>

<script>
export default {
	name: 'InspectionComponent',
	props: ['inspection'],

	computed: {
		car() {
			const inspectedCar = this.$store.state.cars.filter(car => car.id === this.inspection.carId)[0]
			return inspectedCar.brand + ' ' + inspectedCar.model
		}
	},

	methods: {
		removeInspection: function(id) {
			this.$store.dispatch('removeInspection', id)
		}
	}
}
</script>

<style scoped>
td {
	padding: 2px 20px;
	border: 2px solid #42b983;
}

.inspectionRow {
	padding: 15px;
	border: 1px solid lightblue;
}

.date {
	font-weight: bold;
}

.mileage {
	font-weight: bold;
}

.comments {
}

.isPositive {
	text-align: center;
}

.buttonsTd {
	padding: 8px;
	min-width: 165px;
}
</style>
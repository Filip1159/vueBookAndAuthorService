<template>
  <div>
    <div class="heading">
      <div class="inspectionListSpan">Inspections list</div>
        <router-link :to="{ name: 'CreateInspection' }">
          <button class="newCarButton">+ New inspection</button>
        </router-link>
    </div>
    <table class="inspectionListTable">
      <thead>
      <tr>
        <th class="dateTh">Date</th>
        <th class="mileageTh">Mileage</th>
        <th class="commentsTh">Comments</th>
        <th class="isPositiveTh">Is positive</th>
        <th class="carTh">Car</th>
        <th class="actionTh">Action</th>
      </tr>
      </thead>
      <tbody>
      <inspection v-for="inspection in inspectionsList" :key="inspection.id" :inspection="inspection"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import Inspection from "@/components/inspection/InspectionComponent.vue"

export default {
	name: 'InspectionListComponent',
	components: {Inspection},
	data() {
		return {}
	},

	computed: {
		inspectionsList() {
			return this.$store.state.inspections
		}
	}
}
</script>

<style scoped>
.inspectionListSpan {
	font-size: 32px;
	font-weight: 700;
	align-self: flex-start;
	margin: 20px 40px;
}

.inspectionListTable {
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

.dateTh {
	width: 120px;
}

.mileageTh {
	width: 80px;
}

.commentsTh {
	width: 250px;
}

.isPositiveTh {
	width: 130px;
}

.carTh {
	width: 200px;
}

.actionTh {
	width: 100px;
}

.newCarButton {
	padding: 5px 15px;
	width: 180px;
}

.heading {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

a {
	margin: auto 40px;
	display: block !important;
	text-decoration: none !important;
	color: black !important;
}
</style>
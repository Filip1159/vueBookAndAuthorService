<template>
  <div>
    <div class="heading">
      <div class="inspectionListSpan">Inspections list</div>
      <div>
        <router-link :to="{ name: 'CreateInspection' }">
          <button class="newCarButton">+ New inspection</button>
        </router-link>
        <router-link :to="{ name: 'CarList' }">
          <button class="newCarButton">Car list</button>
        </router-link>
      </div>
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
	name: 'InspectionlistComponent',
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

</style>
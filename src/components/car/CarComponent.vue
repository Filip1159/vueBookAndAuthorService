<template>
	<tr class="carRow">
		<td class="brand">{{ car.brand }}</td>
		<td class="model">{{ car.model }}</td>
		<td class="year">{{ car.year }}</td>
		<td class="fistRegistration">{{ car.firstRegistration }}</td>
		<td class="owner">
			<div v-for="owner in ownersSummary" :key="owner">{{ owner }}</div>
		</td>
		<td class="buttonsTd">
			<button @click="removeCar(car.id)">Delete</button>
			<router-link :to="{ name: 'EditCar', params: { id: car.id } }">
				<button>Edit</button>
			</router-link>
		</td>
	</tr>
</template>

<script>
export default {
    name: 'CarComponent',
    props: ['car'],

    computed: {
        ownersSummary() {
            const owners = this.$store.state.owners.filter(owner => this.car.ownerIds.includes(owner.id))
            return owners.map(owner => `${owner.name} ${owner.surname}`)
        }
    },

    methods: {
        removeCar: function (id) {
            this.$store.dispatch('removeCar', id)
        }
    }
}
</script>

<style scoped>
td {
    padding: 2px 20px;
    border: 2px solid #42b983;
}

.carRow {
    padding: 15px;
    border: 1px solid lightblue;
}

.brand {
  font-weight: bold;
}

.model {
    font-weight: bold;
}

.year {
    text-align: end;
}

.firstRegistration {
  text-align: center;
}

.buttonsTd {
    padding: 8px;
	min-width: 165px;
}

</style>
<template>
    <tr class="ownerRow">
        <td class="name">{{ owner.name }}</td>
        <td class="surname">{{ owner.surname }}</td>
        <td class="car">
            <div v-for="car in carsSummary" :key="car">{{ car }}</div>
        </td>
        <td class="buttonsTd">
            <button @click="removeOwner(owner.id)">Delete</button>
            <router-link :to="{ name: 'EditOwner', params: { id: owner.id } }">
                <button>Edit</button>
            </router-link>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'OwnerComponent',
    props: ['owner'],

    computed: {
        carsSummary() {
            const cars = this.$store.state.cars.filter(car => this.owner.carIds.includes(car.id))
            return cars.map(car => `${car.model} (${car.year})`)
        }
    },

    methods: {
        removeOwner: function (id) {
            this.$store.dispatch('removeOwner', id)
        }
    }
}
</script>

<style scoped>
td {
    padding: 2px 20px;
    border: 2px solid #42b983;
}

.ownerRow {
    padding: 15px;
    border: 1px solid lightblue;
}

.name {
    font-weight: bold;
}

.surname {
    text-align: end;
}

.buttonsTd {
    padding: 8px;
    min-width: 165px;
}
</style>

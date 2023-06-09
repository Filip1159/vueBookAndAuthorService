<template>
    <div>
        <div class="heading">
            <div class="ownerListSpan">Owner list</div>
			<router-link :to="{ name: 'CreateOwner' }">
				<button class="newOwnerButton">+ New Owner</button>
			</router-link>
        </div>
        <table class="ownerListTable">
            <thead>
            <tr>
                <th class="nameTh">Name</th>
                <th class="surnameTh">Surname</th>
                <th class="dateOfBirthTh">Date of birth</th>
                <th class="premiumTh">Premium</th>
                <th class="carsTh">Cars</th>
                <th class="actionTh">Action</th>
            </tr>
            </thead>
            <tbody>
            <owner v-for="owner in ownerList" :key="owner.id" :owner="owner"/>
            </tbody>
        </table>
    </div>
</template>

<script>
import Owner from './OwnerComponent.vue'

export default {
    name: 'OwnerListComponent',
    components: {Owner},
    data() {
        return {
        }
    },

	computed: {
		ownerList() {
			return this.$store.state.owners
		}
	}
}
</script>

<style scoped>

.ownerListSpan {
    font-size: 32px;
    font-weight: 700;
    align-self: flex-start;
	margin: 20px 40px;
}

.ownerListTable {
    margin: 30px auto;
}

thead {
    background-color: #42b983;
    font-size: 18px;
    border: 2px solid #42b983;
}

th {
    padding: 6px 25px;
}

.nameTh {
    width: 130px;
}

.surnameTh {
    width: 130px;
}

.dateOfBirthTh {
  width: 200px;
}

.premiumTh {
  width: 60px;
}

.carsTh {
    width: 300px;
}

.actionTh {
    width: 100px;
}

.heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.newOwnerButton {
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
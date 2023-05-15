<template>
    <div>
        <div class="heading">
            <div class="ownerListSpan">Owner list</div>
            <div>
                <router-link :to="{ name: 'CreateOwner' }">
                    <button class="newOwnerButton">+ New Owner</button>
                </router-link>
                <router-link :to="{ name: 'Home' }">
                    <button class="newOwnerButton">Go back home</button>
                </router-link>
            </div>
        </div>
        <table class="ownerListTable">
            <thead>
            <tr>
                <th class="nameTh">Name</th>
                <th class="surnameTh">Surname</th>
                <th class="carsTh">Cars</th>
                <th class="actionTh">Action</th>
            </tr>
            </thead>
            <tbody>
            <owner v-for="owner in ownersPage" :key="owner.id" :owner="owner"/>
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
import Owner from './OwnerComponent.vue'

const paginate = (items, page, perPage = 5) => items.slice(perPage * (page - 1), perPage * page);

export default {
    name: 'OwnerListComponent',
    components: {Owner},
    data() {
        return {
            pageNumber: 1,
        }
    },

    computed: {
        ownersPage() {
            return paginate(this.$store.state.owners, this.pageNumber)
        },
        ownersCount() {
            return this.$store.state.owners.length
        }
    },

    methods: {
        canSwitchNextPage() {
            return this.pageNumber !== Math.ceil(this.ownersCount / 5)
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

.ownerListSpan {
    font-size: 32px;
    font-weight: 700;
    align-self: flex-start;
    margin: 20px 0 40px 100px;
}

.ownerListTable {
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

.nameTh {
    width: 30%;
}

.surnameTh {
    width: 80px;
}

.carsTh {
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
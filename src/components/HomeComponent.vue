<template>
	<div>
		<div class="heading">
			<div class="bookListSpan">Book list</div>
			<router-link :to="{ name: 'CreateBook' }">
				<button class="newBookButton">+ New book</button>
			</router-link>
		</div>
		<table class="bookListTable">
			<thead>
			<tr>
				<th class="titleTh">Title</th>
				<th class="pagesTh">Pages</th>
				<th class="authorsTh">Authors</th>
				<th class="actionTh">Action</th>
			</tr>
			</thead>
			<tbody>
			<book v-for="book in booksPage" :key="book.id" :book="book"/>
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
import Book from './BookComponent.vue'

const paginate = (items, page, perPage = 5) => items.slice(perPage * (page - 1), perPage * page);

export default {
    name: 'HomeComponent',
    components: {Book},
	data() {
		return {
			pageNumber: 1,
		}
	},

	computed: {
		booksPage() {
			return paginate(this.$store.state.books, this.pageNumber)
		},
		booksCount() {
			return this.$store.state.books.length
		}
	},

	methods: {
		canSwitchNextPage() {
			return this.pageNumber !== Math.ceil(this.booksCount / 5)
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
.bookListSpan {
	font-size: 32px;
	font-weight: 700;
	align-self: flex-start;
	margin: 20px 0 40px 100px;
}

.bookListTable {
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

.titleTh {
	width: 30%;
}

.pagesTh {
    width: 80px;
}

.authorsTh {
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

.newBookButton {
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
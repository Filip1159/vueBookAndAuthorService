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
				<th>Title</th>
				<th class="pagesTh">Pages</th>
				<th>Authors</th>
				<th class="actionTh">Action</th>
			</tr>
			</thead>
			<tbody>
			<book v-for="book in $store.state.books" :key="book.id" :book="book"/>
			</tbody>
		</table>
	</div>
</template>

<script>
import Book from './BookComponent.vue'

export default {
    name: 'HomeComponent',
    components: {Book}
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

.pagesTh {
    width: 80px;
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

</style>
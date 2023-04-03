<template>
	<div>
		<div class="heading">
			<div class="bookListSpan">Book list</div>
			<router-link :to="{ name: 'CreateBook' }">
				<div class="newBookButton">+ New book</div>
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
    font-size: 28px;
    margin: 10px 40px;
}

.bookListTable {
    margin: 30px auto;
    min-width: 70%;
}

thead {
    background-color: darkgray;
    font-size: 18px;
}

tbody {
    background-color: cadetblue;
}

th {
    padding: 2px 20px;
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
    border: 2px solid darkslategray;
    border-radius: 4px;
    background-color: aquamarine;
    padding: 5px 15px;
    width: 150px;
    text-align: center;
    cursor: pointer;
}

a {
    margin: auto 40px;
    display: block !important;
    text-decoration: none !important;
    color: black !important;
}

</style>
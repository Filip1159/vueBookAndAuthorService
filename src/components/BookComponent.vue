<template>
	<tr class="bookRow">
		<td class="title">{{ book.title }}</td>
		<td class="pages">{{ book.pages }}</td>
		<td class="author">
			<div v-for="author in authorsSummary" :key="author">{{ author }}</div>
		</td>
		<td class="buttonsTd">
			<button @click="removeBook(book.id)">Delete</button>
			<router-link :to="{ name: 'EditBook', params: { id: book.id } }">
				<button>Edit</button>
			</router-link>
		</td>
	</tr>
</template>

<script>
export default {
    name: 'BookComponent',
    props: ['book'],

    computed: {
        authorsSummary() {
            const authors = this.$store.state.authors.filter(author => this.book.authorIds.includes(author.id))
            return authors.map(author => `${author.name} ${author.surname}`)
        }
    },

    methods: {
        removeBook: function (id) {
            this.$store.dispatch('removeBook', id)
        }
    }
}
</script>

<style scoped>
td {
    padding: 2px 20px;
    border: 2px solid #42b983;
}

.bookRow {
    padding: 15px;
    border: 1px solid lightblue;
}

.title {
    font-weight: bold;
}

.pages {
    text-align: end;
}

.buttonsTd {
    padding: 8px;
	min-width: 165px;
}

</style>
<template>
	<form>
		<div class="inputWrapper">
			<label for="title">Title:</label>
			<input type="text" name="title" id="title" :value="bookBeingUpdated.title"/>
		</div>
		<div class="inputWrapper">
			<label for="pages">Pages:</label>
			<input type="text" name="pages" id="pages" :value="bookBeingUpdated.pages"/>
		</div>
		<multiselect
				class="multiselect"
				v-model="s"
				:multiple="true"
				:options="authorNames"
				label="fullName"
				track-by="fullName"
		>
		</multiselect>
	</form>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
    name: "EditBookComponent",
	props: ['id'],
    components: {Multiselect},

	data() {
		return {
			s: []
		}
	},

    computed: {
        authorNames() {
            return this.$store.state.authors.map(author => ({
                id: author.id,
                fullName: `${author.name} ${author.surname}`
            }))
        },
		bookBeingUpdated() {
			let book = this.$store.state.books.filter(book => book.id === this.$route.params.id)[0]
			const authors = this.$store.state.authors.filter(author => book.authorIds.includes(author.id))
			const formattedAuthors = authors.map(author => ({
				id: author.id,
				fullName: `${author.name} ${author.surname}`
			}))
			book.authors = formattedAuthors
			console.log(book)
			return book
		}
    }
}
</script>

<style scoped>
form {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.inputWrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.multiselect {
    max-width: 400px;
}
</style>
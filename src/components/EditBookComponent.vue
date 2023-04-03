<template>
	<form>
		<div class="inputWrapper">
			<label for="title">Title:</label>
			<input type="text" name="title" id="title" v-model="bookBeingUpdated.title"/>
		</div>
		<div class="inputWrapper">
			<label for="pages">Pages:</label>
			<input type="text" name="pages" id="pages" v-model="bookBeingUpdated.pages"/>
		</div>
		<multiselect
				class="multiselect"
				v-model="selectedAuthors"
				:multiple="true"
				:options="authorNames"
				label="fullName"
				track-by="fullName"
		>
		</multiselect>
		<div class="inputWrapper">
			<button @click="e => saveBook(e)">Save</button>
			<router-link :to="{ name: 'Home' }">
				<button>Cancel</button>
			</router-link>
		</div>
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
            bookBeingUpdated: {},
			selectedAuthors: []
        }
    },

    mounted() {
		this.bookBeingUpdated = this.$store.state.books.filter(book => book.id === this.$route.params.id)[0]
		const authors = this.$store.state.authors.filter(author => this.bookBeingUpdated.authorIds.includes(author.id))
		this.selectedAuthors = authors.map(author => ({
			id: author.id,
			fullName: `${author.name} ${author.surname}`
		}))
    },

    computed: {
        authorNames() {
            return this.$store.state.authors.map(author => ({
                id: author.id,
                fullName: `${author.name} ${author.surname}`
            }))
        }
    },

	methods: {
		saveBook: function (e) {
			e.preventDefault()
			const newlyUpdatedBook = {
				id: this.bookBeingUpdated.id,
				title: this.bookBeingUpdated.title,
				pages: this.bookBeingUpdated.pages,
				authorIds: this.selectedAuthors.map(a => a.id)
			}
			this.$store.dispatch('updateBook', newlyUpdatedBook)
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
<template>
	<form @submit="e => createBook(e)">
		<div class="formTitle">Create new book</div>
		<div class="inputWrapper">
			<label for="title">Title:</label>
			<input type="text" name="title" id="title" v-model="book.title"/>
		</div>
		<div class="inputWrapper">
			<label for="pages">Pages:</label>
			<input type="text" name="pages" id="pages" v-model="book.pages"/>
		</div>
			<multiselect
				placeholder="Authors"
				class="multiselect"
				v-model="selectedAuthors"
				:multiple="true"
				:options="authors"
				label="fullName"
				track-by="fullName"
			>
			</multiselect>
		<div class="buttonsWrapper">
			<button @click="e => createBook(e)">Save</button>
			<router-link :to="{ name: 'Home' }">
				<button>Cancel</button>
			</router-link>
		</div>
	</form>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
    name: "CreateBookComponent",
    components: {Multiselect},
    data() {
        return {
            book: {},
            selectedAuthors: null,
            authors: []
        }
    },

    mounted() {
        this.authors = this.$store.state.authors
            .map(author => ({
                id: author.id,
                fullName: `${author.name} ${author.surname}`
            }))
    },

    methods: {
        createBook: function (e) {
            e.preventDefault()
			const bookToCreate = {
				title: this.book.title,
				pages: this.book.pages,
				authorIds: this.selectedAuthors.map(a => a.id)
			}
            this.$store.dispatch('createBook', bookToCreate).then(() => {
				this.$router.push('/')
			})
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

.formTitle {
	font-size: 32px;
	font-weight: 700;
	align-self: flex-start;
	margin-left: 40px;
	margin-bottom: 40px;
}

.inputWrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
	font-size: 18px;
}

.buttonsWrapper {
	display: flex;
	flex-direction: row;
	gap: 20px;
}

button {
	padding: 5px 15px;
	width: 120px;
}

.multiselect {
	min-width: 400px;
    max-width: 400px;
	border: 2px solid black;
	border-radius: 4px;
	margin-bottom: 150px;
}

</style>

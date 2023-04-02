<template>
	<div>
		<header class="header">
			Book and Author service
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
    name: 'App',
    components: {},
	created () {
		fetch(`http://localhost:9000/book`)
			.then(r => r.json())
			.then(json => {
				console.log("Books")
				console.log(json)
				this.$store.dispatch('setBooks', json)
			})
			.catch(e => console.warn(e))
		fetch(`http://localhost:9000/author`)
			.then(r => r.json())
			.then(json => {
				console.log("Authors")
				console.log(json)
				this.$store.dispatch('setAuthors', json)
			})
			.catch(e => console.warn(e))
	}
}
</script>

<style>
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.header {
    background-color: #42b983;
    font-size: 36px;
    color: white;
    padding: 20px;
    text-align: start;
    margin: 0;
}
</style>

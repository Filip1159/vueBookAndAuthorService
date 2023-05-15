<template>
	<div>
		<header class="header">
			Car and Owner service
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
    name: 'App',
    components: {},
	created () {
		fetch(`http://localhost:9000/car`)
			.then(r => r.json())
			.then(json => {
				console.log("Cars")
				console.log(json)
				this.$store.dispatch('setCars', json)
			})
			.catch(e => console.warn(e))
		fetch(`http://localhost:9000/owner`)
			.then(r => r.json())
			.then(json => {
				console.log("Owners")
				console.log(json)
				this.$store.dispatch('setOwners', json)
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
	background: gainsboro;
}

.header {
    background-color: #42b983;
    font-size: 36px;
    color: white;
    padding: 20px;
    text-align: start;
    margin: 0;
	border-bottom: 5px solid black;
}

button {
	cursor: pointer;
	background: #42b983;
	border: 3px solid black;
	border-radius: 8px;
	color: white;
	float: left;
	margin: 0 4px;
	width: 65px;
	text-align: center;
}

button:hover {
	box-shadow: 5px 5px 5px #aaa;;
}

input[type="text"] {
	outline: none;
	border-radius: 4px;
	padding: 4px;
}

label {
	padding: 4px;
}

</style>

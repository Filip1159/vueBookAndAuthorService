<template>
    <div>
        <div class="authors" v-html="authors"></div>
    </div>
</template>

<script>

export default {
    name: 'AuthorsComponent',

    data() {
        return {
        }
    },

    computed: {
        authors() {
            return this.$store.state.authors
        }
    },
}
</script>

<style scoped>

.authors {
    margin: 100px auto 100px auto;
    width: 500px !important;
    font-size: 32px;
}

</style>
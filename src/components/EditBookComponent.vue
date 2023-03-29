<template>
<form>
  <div class="inputWrapper">
    <label for="title">Title:</label>
    <input type="text" name="title" id="title" :value="book.title" />
  </div>
  <div class="inputWrapper">
    <label for="pages">Pages:</label>
    <input type="text" name="pages" id="pages" :value="book.pages"/>
  </div>
  <div class="inputWrapper">
    <label for="authors">Authors:</label>
    <input type="text" name="authors" id="authors" />
  </div>
</form>
</template>

<script>
export default {
  name: "EditBookComponent",
  props: ['id'],

  data() {
    return { book: {} }
  },

  mounted () {
    fetch(`http://localhost:9000/book/${this.$route.params.id}`)
        .then(r => r.json())
        .then(json => {
          this.book = json
        })
        .catch(e => console.warn(e))
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
</style>
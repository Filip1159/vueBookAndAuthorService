<template>
  <form @submit="e => createBook(e)">
    <div class="inputWrapper">
      <label for="title">Title:</label>
      <input type="text" name="title" id="title" v-model="book.title" />
    </div>
    <div class="inputWrapper">
      <label for="pages">Pages:</label>
      <input type="text" name="pages" id="pages" v-model="book.pages" />
    </div>
    <div class="inputWrapper">
      <label for="authors">Authors:</label>
      <input type="text" name="authors" id="authors" />
    </div>
    <input type="submit" value="Submit"/>
  </form>
</template>

<script>
export default {
  name: "CreateBookComponent",
  data() {
    return { book: {} }
  },

  methods: {
    createBook: function (e) {
      e.preventDefault()
      fetch(`http://localhost:9000/book`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...this.book, authorIds: []})
      } )
          .then(r => {
            if (r.status === 201) {
              this.$router.push('/')
            }
          })
          .catch(e => console.warn(e))
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
</style>
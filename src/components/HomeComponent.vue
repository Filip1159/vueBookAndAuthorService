<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <book-list :books="books" :remove-book="removeBook" />
  </div>
</template>

<script>
import BookList from './BookListComponent.vue'

export default {
  name: 'HomeComponent',
  data () {
    return {
      msg: 'Welcome to the Library',
      books: [
        {id: 1, title: 'Book 1', pages: 100, author: {name: 'Author 1'}},
        {id: 2, title: 'Book 2', pages: 300, author: {name: 'Author 2'}},
        {id: 3, title: 'Book 3', pages: 200, author: {name: 'Author 3'}}
      ]
    }
  },
  mounted () {
    fetch(`http://localhost:9000/book`)
        .then(r => r.json())
        .then(json => {
          this.books = json
        })
        .catch(e => console.warn(e))
  },

  methods: {
    removeBook: function (id) {
      fetch(`http://localhost:9000/book/${id}`, {method: 'delete'})
          .then(r => {
            if (r.status === 200) {
              this.books = this.books.filter(b => b.id !== id)
            }
          })
    }
  },

  components: { BookList }
}
</script>

<style scoped>
.hello {
  width: 1000px;
  margin: 0 auto;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
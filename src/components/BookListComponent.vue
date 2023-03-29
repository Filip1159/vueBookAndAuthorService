<template>
  <table class="book-list">
    <thead>
      <td>Title</td>
      <td>Pages</td>
      <td>Author</td>
    </thead>
    <tbody>
      <book v-for="book in books" :removeBook="removeBook" :key="book.id" :book="book" />
    </tbody>
  </table>
</template>

<script>
import Book from './BookComponent'

export default {
  name: 'BookListComponent',
  props: ['books', 'removeBook'],
  components: {
    book: Book
  }
}
</script>

<style scoped>
.book-list {
  min-width: 1000px
}
</style>
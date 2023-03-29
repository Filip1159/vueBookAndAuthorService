<template>
  <div class="bookListSpan">Book list</div>
  <table class="bookListTable">
    <thead>
      <tr>
        <th>Title</th>
        <th class="pagesTh">Pages</th>
        <th>Authors</th>
        <th class="actionTh">Action</th>
      </tr>
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
.bookListSpan {
  font-size: 28px;
  margin: 10px 40px;
}

.bookListTable {
  margin: 30px auto;
  min-width: 70%;
}

thead {
  background-color: darkgray;
  font-size: 18px;
}

tbody {
  background-color: cadetblue;
}

th {
  padding: 2px;
}

.pagesTh {
  width: 80px;
}

.actionTh {
  width: 100px;
}
</style>
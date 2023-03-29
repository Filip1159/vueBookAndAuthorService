<template>
  <tr class="book-row">
    <td class="title">{{book.title}}</td>
    <td class="pages">{{book.pages}}</td>
    <td class="author">AA</td>
    <td><button @click="removeBook(book.id)">X</button></td>
  </tr>
</template>

<script>
export default {
  name: 'BookComponent',
  props: ['book', 'removeBook']
}
</script>

<style scoped>
.book-row {
  padding: 15px;
  border: 1px solid lightblue;
}

.title {
  font-weight: bold;
}

.pages {
  font-style: italic;
}

.author {
  text-decoration: underline;
}
</style>
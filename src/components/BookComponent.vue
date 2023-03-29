<template>
  <tr class="bookRow">
    <td class="title">{{book.title}}</td>
    <td class="pages">{{book.pages}}</td>
    <td class="author">AA</td>
    <td class="buttonsTd">
      <button @click="removeBook(book.id)">Delete</button>
      <router-link :to="{ name: 'EditBook', params: { id: book.id } }">
        <button>Edit</button>
      </router-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'BookComponent',
  props: ['book', 'removeBook', 'updateBook']
}
</script>

<style scoped>
td {
  padding: 2px 10px;
}

.bookRow {
  padding: 15px;
  border: 1px solid lightblue;
}

.title {
  font-weight: bold;
}

.pages {
  text-align: end;
}

.author {
  text-decoration: underline;
}

button {
  border: 2px solid darkslategray;
  background-color: aquamarine;
}

.buttonsTd {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
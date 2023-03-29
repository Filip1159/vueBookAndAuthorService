<template>
<form>
  <div class="inputWrapper">
    <label for="title">Title:</label>
    <input type="text" name="title" id="title" :value="$route.params.id" />
  </div>
  <div class="inputWrapper">
    <label for="pages">Pages:</label>
    <input type="text" name="pages" id="pages" :value="$route.params.book"/>
  </div>
  <div class="inputWrapper">
    <label for="authors">Authors:</label>
    <input type="text" name="authors" id="authors" />
  </div>
</form>
</template>

<script>
export default {
  name: "EditBookComponent"
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
<template>
  <div class="dupa">Dupa {{msg}}</div>
</template>

<script>
export default {
  name: 'DupaComponent',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dupe {
  color: red;
}
</style>

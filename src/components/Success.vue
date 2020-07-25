<template>
  <div class="notification is-success">
    <button @click="semit('closeMessage')" class="delete"></button>
    {{ message }}
  </div>
</template>

<script>
    export default {
        name: "Success",
        props: ['message']
    }
</script>

<style scoped>
  .notification {
    margin-top: 20px;
  }
</style>

<template>
  <div class="notification is-danger">
    {{ message }}
  </div>
</template>

<script>
    export default {
        name: "Error",
        props: ['message'],
    }
</script>

<style scoped>
    .notification {
      margin-top: 20px;
    }
</style>

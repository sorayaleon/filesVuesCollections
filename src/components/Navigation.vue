<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link v-if="!user" class="button is-primary" to="/register">Register</router-link>
            <router-link v-if="!user" class="button is-light" to="/login">Login</router-link>
            <router-link v-if="user" class="button is-light" to="/profile">Profile</router-link>
            <a v-if="user" @click="logout" class="button is-ligth" href="#">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  const fb = require('../firebase.js');
  import { bulmaHeader } from '../assets/utils';
  import { mapState } from 'vuex';

  export default {
    name: 'Navigation',
    mounted() {
      bulmaHeader();
    },
    methods: {
      logout() {
        fb.auth.signOut().then(() => {
          if(this.$route.fullPath != '/') {
            this.$router.push('/');
          }
          this.$store.dispatch('clear');
        }).catch(error => {
          console.error(error);
        })
      }
    },
    computed: {
      ...mapState(['user']),
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

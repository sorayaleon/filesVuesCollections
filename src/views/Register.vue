<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Register</h1>
          <hr>
          <form @submit.prevent="register">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="name" class="input" type="text" placeholder="Name" required>
                <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="surname" class="input" type="text" placeholder="Surname" required>
                <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="mail" class="input" type="email" placeholder="Email" required>
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope-o"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model.trim="pass" class="input" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                    <i class="fa fa-unlock-alt"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-info" :class="{'is-loading': working}">
                  Register
                </button>
              </p>
            </div>
          </form>
          <hr>
          <ul>
            <li>
              <router-link to="recover">Reset password</router-link>
            </li>
          </ul>
        </div>
      </div>


    </div>
  </section>
</template>

<script>
    const fb = require('../firebase.js');
    export default {
        name: "Register",
        data(){
          return {
            name: '',
            surname: '',
            mail: '',
            pass: '',
            working: false,
          }
        },
        methods: {
          register() {
            this.working = true;
            fb.auth.createUserWithEmailAndPassword(this.mail, this.pass).then(user => {
              this.$store.commit('setUser', user.user);
              fb.usersCollection.doc(user.user.uid).set({
                name: this.name,
                surname: this.surname,
                register: new Date(),
              }).then(() => {
                this.$store.dispatch('getUserProfile');
                this.$router.push('/');
              }).catch(error => {
                console.error(error);
              });
            }).catch(error => {
              console.error(error);
            }).finally(() => this.working = false);
          }
        }
    }
</script>

<style scoped>

</style>

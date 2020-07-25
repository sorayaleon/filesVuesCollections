<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Login</h1>
          <hr>
          <form @submit.prevent="login">
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
                <button class="button is-info">
                  Login
                </button>
              </p>
            </div>
          </form>
          <Error v-if="messageError" :message="messageError"></Error>
          <hr>
          <ul>
            <li>
              <router-link to="/recover">Reset Password</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    const fb = require('../firebase.js');
    import Error from '../components/Error';
    export default {
        name: "Login",
        data(){
            return {
                mail: '',
                pass: '',
                working: false,
                messageError: '',
            }
        },
        methods:{
            login(){
              this.working = true;
              this.messageError = '';
              fb.auth.signInWithEmailAndPassword(this.mail, this.pass).then(user => {
                this.$store.commit('setUser', user.user);
                this.$store.dispatch('getUserProfile');
                this.$router.push('/');
              }).catch(error => {
                console.error(error);
                this.messageError = error.message;
              }).finally(() => this.working = false);
            }
        },
        components:{
            Error,
        }
    };
</script>

<style scoped>

</style>

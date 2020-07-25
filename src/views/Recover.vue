<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Reset Password</h1>
          <p class="subtitle">Enter your email to start the recovery process.</p>
          <hr>
          <form @submit.prevent="recover">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="mail" class="input" type="email" placeholder="Email" required>
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope-o"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-info" :class="{'is-loading': working}">
                  Recover
                </button>
              </p>
            </div>
          </form>

          <Error v-if="messageError" :message="messageError"></Error>
          <Success @closeMessage="messageSuccess = ''" v-if="messageSuccess" :message="messageSuccess"></Success>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
    const fb = require('../firebase.js');
    import Error from '../components/Error';
    import Success from "../components/Success";
    export default {
        name: "Recover",
        data(){
            return{
              mail: '',
              working: false,
              messageError: '',
              messageSuccess: '',
            }
        },
        methods: {
          recover() {
            this.working = true;
            this.messageSuccess = this.messageError = '';
            fb.auth.sendPasswordResetEmail(this.mail).then(() => {
              this.messageSuccess = 'Success. Please check your inbox';
              this.mail = '';
              this.redirect();
            }).catch(error => {
              this.messageError = error.message;
            }).finally(() => this.working = false);
          },
          redirect() {
            let timeout = setTimeout(() => {
              clearTimeout(timeout);
              this.$router.push('/login');
            }, 2000);
          }
        },
        components: {
          Error,
          Success,
        }
    }
</script>

<style scoped>

</style>

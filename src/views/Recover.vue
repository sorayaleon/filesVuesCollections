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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    const fb = require('../firebase.js');
    export default {
        name: "Recover",
        data(){
            return{
              mail: '',
              working: false,
            }
        },
        methods: {
          recover() {
            this.working = true;
            fb.auth.sendPasswordResetEmail(this.mail).then(() => {
              console.info('Success');
              this.mail = '';
              this.redirect();
            }).catch(error => {
              console.error(error);
            }).finally(() => this.working = false);
          },
          redirect() {
            let timeout = setTimeout(() => {
              clearTimeout(timeout);
              this.$router.push('/login');
            }, 2000);
          }
        }
    }
</script>

<style scoped>

</style>

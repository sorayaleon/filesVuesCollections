<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Perfil</h1>
          <hr>
          <form @submit.prevent="update">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="name" class="input" type="text" :placeholder="profile.name">
                <span class="icon is-small is-left">
                   <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="surname" class="input" type="text" :placeholder="profile.surname">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="mail" class="input" type="email" :placeholder="user.email">
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="New password">
                  <span class="icon is-small is-left">
                    <i class="fa fa-unlock-alt"></i>
                  </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button :disabled="!changes" class="button is-info" :class="{ 'is-loading': working}">
                  Actualizar </button>
              </p>
            </div>
          </form>
          <Error v-show="messageError" :message="messageError"></Error>
          <Success @closeMessage="messageSuccess = ''" v-show="messageSuccess" :message="messageSuccess"></Success>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Success from "../components/Success";
  import Error from "../components/Error";
  import { mapState } from 'vuex';
  const fb = require('../firebase.js');

  export default {
    name: 'profile',
    data() {
      return {
        name: '',
        surname: '',
        mail: '',
        pass: '',
        working: false,
        messageSuccess: '',
        messageError: '',
      }
    },
    methods:{
      update(){
        this.working = true;
        this.messageSuccess = this.messageError = '';
        this.promises = [];

        let user = fb.auth.currentUser;

        if (this.name.length || this.surname.length) {
          let changes = {};
          if (this.name.length) {
            changes.name = this.name;
          }
          if (this.surname.length) {
            changes.surname = this.surname;
          }
          let promise = fb.usersCollection.doc(this.user.uid).update(changes).then(()=> {
            fb.resourcesCollection.where('userId', '==', this.user.uid).get().then(docs => {
              docs.forEach(doc => {
                fb.resourcesCollection.doc(doc.id).update({
                  name: this.name,
                });
              });
            });
            fb.commentCollection.where('userId', '==', this.user.uid).get().then(docs => {
              docs.forEach(doc => {
                fb.commentCollection.doc(doc.id).update({
                  name: this.name,
                });
              });
            });
          });
          this.promises.push(promise);
        }

        if (this.mail.length) {
          let promise = user.updateEmail(this.mail);
          this.promises.push(promise);
        }

        if (this.pass.length) {
          let promise = user.updatePassword(this.pass);
          this.promises.push(promise);
        }
        if (this.promises.length) {
          Promise.all(this.promises).then(() => {
            this.$store.dispatch('getUserProfile');
            this.messageSuccess = 'Updated profile.';
          }).catch(error => {
            console.error(error);
            this.messageError = error.message;
          }).finally(() => this.working = false);
        }

      }
    },
    computed: {
      ...mapState(['user', 'profile']),
      changes() {
        return (this.name.length || this.surname.length || this.mail.length || this.pass.length);
      }
    },
    components: {
      Success,
      Error,
    }
  }

</script>

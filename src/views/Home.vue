<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">The best resources to master Vue.js</h1>
      <hr />

      <div class="columns" id="home">
        <div class="column is-half-tablet">
          <ResourcePreview :key="resource.id" @del="del" v-for="resource in resources" :data="resource"></ResourcePreview>
        </div>

        <h1 class="has-text-centered" v-if="!resources.length">Resources not found.</h1>

        <div class="column is-offset-1">
          <section class="section has-background-light">
            <form @submit.prevent="add">
              <div class="field">
                <label class="label">Resource title</label>
                <div class="control">
                  <input v-model.trim="title" class="input" type="text" required />
                </div>
              </div>

              <div class="field">
                <label class="label">Resource URL</label>
                <div class="control">
                  <input v-model.trim="url" class="input" type="text" required />
                </div>
              </div>

              <div class="field">
                <label class="label">Resource Description</label>
                <div class="control">
                  <textarea v-model.trim="description" class="textarea" required></textarea>
                </div>
              </div>

              <div v-if="user" class="field is-grouped">
                <div class="control">
                  <button type="submit" class="button is-link" :class="{'is-loading': working}">Add resource</button>
                </div>
              </div>
              <p v-else>To add resources you must <router-link to="/login">authenticate</router-link> to the app</p>
            </form>
            <Error v-if="messageError" :message="messageError"></Error>
            <Success @closeMessage="messageSuccess = ''" v-if="messageSuccess" :message="messageSuccess"></Success>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  const fb = require('../firebase.js');
  import Success from "../components/Success";
  import Error from "../components/Error";
  import ResourcePreview from "../components/ResourcePreview";
  import { mapState } from 'vuex';
  export default {
    name: 'Home',
    data(){
      return {
        title: '',
        url: '',
        description: '',
        working: false,
        messageError: '',
        messageSuccess: '',
      }
    },
    methods:{
      add(){
        this.working = true;
        this.messageError = '';
        fb.resourcesCollection.add({
          when: new Date(),
          title: this.title,
          url: this.url,
          description: this.description,
          userId: this.user.uid,
          name: this.profile.name,
          comment: 0,
          votes: 0,
        }).then(() =>{
          this.messageSuccess ='Successfully added resource.';
          this.clear();
        }).catch(error => {
          console.error(error);
          this.messageError(error.message);
        }).finally(() => this.working = false);
      },
     del(id){
       this.messageError = '';
       fb.resourcesCollection.doc(id).delete().catch(error => {
         console.error(error);
         this.messageError = error.message;
       });
     } ,
      clear() {
        this.title = this.description = this.url = '';
      },
    },
    computed:{
      ...mapState(['user', 'profile', 'resources', "otherResources"]),
    },
    components: {
      Success,
      Error,
      ResourcePreview,
    },
  };
</script>

<style scoped>
  @media screen and (max-width: 768px) {
    #home {
      display: flex;
      flex-direction: column-reverse;
    }
  }
</style>

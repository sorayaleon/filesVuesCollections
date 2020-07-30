<template>
  <section class="section">
    <Resource @visualize="visualize" v-if="visibleResource" :id="resourceId"></Resource>
    <div class="container">
      <h1 class="title has-text-centered">The best resources to master Vue.js</h1>
      <hr />

      <div class="columns" id="home">
        <div class="column is-half-tablet">
          <transition name="fade">
            <div @click="showOthers" v-if="otherResources.length" class="notification is-info" id="new-notice">
              <p>{{ otherResources.length }} new resources have been added.</p>
              <a>Click to see them.</a>
            </div>
          </transition>
          <ResourcePreview :key="resource.id" @visualize="visualize" @del="del" v-for="resource in resources" :data="resource"></ResourcePreview>
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

          <section class="section">
            <h2>Top resources</h2>
            <hr>
            <div v-for="top in topResources" :key="top.id" class="box">
              <article class="media">
                <div class="media-content">
                  <div class="content top">
                    <p>
                      <a @click="visualize(true, top.id)">
                        <strong>{{ top.title }}</strong>
                        <br>
                        <small>{{ top.votes }} votes</small>
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            </div>
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
  import Resource from "../components/Resource";
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
        resourceId: null,
        visibleResource: false,
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
          comments: 0,
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
      visualize(status, id){
        if(id){
          this.resourceId = id;
        }
        this.visibleResource = status;
      },
      showOthers(){
        this.$store.commit('setResources', this.otherResources.concat(this.resources));
        this.$store.commit('clearOthers');
      }
    },
    computed:{
      ...mapState(['user', 'profile', 'resources', 'otherResources', 'topResources']),
    },
    components: {
      Success,
      Error,
      ResourcePreview,
      Resource
    },
  };
</script>

<style scoped>
  #new-notice {
    animation: jump 0.5s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
  }

  .top a {
    color: inherit;
  }

  @keyframes jump {
    from { transform: translateY(0); }
    to   { transform: translateY(10px); }
  }

  @media screen and (max-width: 768px) {
    #home {
      display: flex;
      flex-direction: column-reverse;
    }
  }
</style>

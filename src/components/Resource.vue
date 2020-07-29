<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" >
      <header class="modal-card-head">
        <p class="modal-card-title">{{ resource.title }}</p>
        <button @click="$emit('visualize', false)" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p>
          {{ resource.description }}
        </p>
        <br>
        <p class="has-text-right">
          <small>{{ resource.name }}</small> <small><i>({{ resource.when | since}})</i></small>
        </p>
        <hr>

        <!-- comments -->
        <h2 class="subtitle">comments</h2>
        <form @submit.prevent="commentt">
          <div class="field">
            <div class="control">
              <textarea v-model.trim="comment" class="textarea" placeholder="Textarea" required></textarea>
            </div>
          </div>
          <div class="field">
            <p class="control">
              <button v-if="user" :disabled="!comment.length" class="button is-info" :class="{ 'is-loading': working }">
                comment
              </button>
              <span v-else>
                  To comment you must be <router-link to="/register">registered</router-link>.
              </span>
            </p>
          </div>
        </form>

        <Error v-show="messageError" :mensaje="messageError"></Error>
        <Exito @close="messageSuccess = ''" v-show="messageSuccess" :mensaje="messageSuccess"></Exito>

        <br>
        <template v-for="comment in localComment">
          <div :key="comment.id" class="box">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    {{ comment.comment }}
                    <br>
                    <strong>{{ comment.name }}</strong> | <small>{{ comment.when | since }}</small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </template>

      </section>
      <footer class="modal-card-foot">
        <span v-if="!user">
          <router-link to="/register">Register</router-link> to vote.
        </span>
        <span v-else-if="voted">The vote has been recorded.</span>
        <button v-else @click="vote" class="button is-danger" :class="{'is-loading': working}">Votar recurso</button>
      </footer>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
    const fb = require('../firebase');
    export default {
      name: "Resource",
      created() {
          this.index = this.resources.findIndex(resource => resource.id === this.id);
          this.resource = this.resources[this.index];

          if(this.user){
            let voteId = this.user.uid + '_' + this.resource.id;
            fb.votesCollection.doc(voteId).get().then(doc => {
              if (!doc.exists) {
                this.voted = false;
              }
            });
          }
      },
      data() {
        return {
          index: null,
          resource: {},
          comment: '',
          working: false,
          voted: true,
        }
      },
      props: ['id'],
      computed: {
        ...mapState(['user', 'resources', 'profile'])
      },
      methods: {
          vote() {
            this.working = true;

            let voteId = this.user.uid + '_' + this.resource.id;
            fb.votesCollection.doc(voteId).set({
              resourceId: this.resource.id,
              userId: this.user.uid,
            }).then( () => {
              fb.resourcesCollection.doc(this.resource.id).update({
                votes: this.resource.votes + 1
              }).then( () => {
                this.voted = true;
              }).catch(error => {
                console.log(error);
              }).catch(error => {
                console.log(error);
              })
            }).finally( () => this.working = false);
          }
      },
      filters: {
        since(value) {
          return moment(value.toDate()).fromNow();
        }
      }
    }
</script>

<style scoped>

</style>

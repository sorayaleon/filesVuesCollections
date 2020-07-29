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
        <button class="button is-danger">Votar recurso</button>
      </footer>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
    export default {
        name: "Resource",
      created() {
          this.index = this.resources.findIndex(resource => resource.id === this.id);
          this.resource = this.resources[this.index];
      },
      data() {
        return {
          index: null,
          resource: {},
          comment: '',
        }
      },
      props: ['id'],
      computed: {
        ...mapState(['user', 'resources', 'profile'])
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

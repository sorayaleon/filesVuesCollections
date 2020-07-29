<template>
  <div class="box" :class="{ self: belongs }">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <button v-if="belongs" @click="$emit('del', data.id)" class="delete is-small is-pulled-right" aria-label="delete"></button>
          <p>
            <b>{{ data.title }}</b>
            <br>
            {{ data.description | abstract }}
            <br>
            <small>{{ data.name }}</small>
            <small> <i> ({{ data.when | since }})</i> </small>
          </p>
        </div>
        <nav class="level is-pulled-left">
          <div class="level-left">
            <a class="level-item" aria-label="reply">
              <a :href="data.url" class="button is-link is-small">Go</a>
            </a>
            <a class="level-item">
              <a @click="$emit('visualize', true, data.id)" target="_blank" class="button is-primary is-small">More info</a>
            </a>
          </div>
        </nav>
        <nav class="level is-pulled-right">
          <div class="level-right">
            <a href="#" class="level-item" aria-label="reply">{{ data.comment }} Comment</a>
            <a href="#" class="level-item">{{ data.votes }} Votes</a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';
    export default {
        name: "ResourcePreview",
        props: ['data'],
        computed: {
           ...mapState(['user']),
            belongs() {
              if(!this.user){
                return false;
              }
              return this.user.uid === this.data.userId;
            }
        },
        filters: {
          abstract(value) {
            return (value.length < 120) ? value : `${value.substring(0, 120)}...`;
          },
          since(value) {
            return moment(value.toDate()).fromNow();
          }
        }
    }
</script>

<style scoped>
  .self {
    background-color: #ccc;
  }
</style>

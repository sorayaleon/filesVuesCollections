<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">The best resources to master Vue.js</h1>
      <hr />

      <div class="columns" id="home">
        <div class="column is-half-tablet">
          <div class="box">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <button class="delete is-small is-pulled-right" aria-label="delete"></button>
                  <p>
                    <b>Title</b>
                    <br>
                    Description
                    <br>
                    <small>User</small>
                    <small> <i> (A moment ago...)</i> </small>
                  </p>
                </div>
                <nav class="level is-pulled-left">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <a href="#" class="button is-link is-small">Go</a>
                    </a>
                    <a class="level-item">
                      <a href="#" target="_blank" class="button is-primary is-small">More info</a>
                    </a>
                  </div>
                </nav>
                <nav class="level is-pulled-right">
                  <div class="level-right">
                    <a href="#" class="level-item" aria-label="reply">1 Comment</a>
                    <a href="#" class="level-item">3 Votes</a>
                  </div>
                </nav>
              </div>
            </article>
          </div>

        </div>

        <div class="column is-offset-1">
          <section class="section has-background-light">
            <form>
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

              <div class="field is-grouped">
                <div class="control">
                  <button type="submit" class="button is-link">Add resource</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  components: {
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

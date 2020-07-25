import Vue from 'vue';
import Vuex from 'vuex';

const fb = require ('../firebase.js');

Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
  if(user){
    store.commit('setUser', user);
    store.dispatch('getUserProfile');
  }
})

 const store = new Vuex.Store({
  state: {
    user: null,
    profile: {},
  },
  mutations: {
    setUser (state, value){
      state.user = value;
    },
    setProfile (state, value){
      state.profile = value;
    },
  },
  actions: {
    getUserProfile ({commit, state}){
      fb.usersCollection.doc(state.user.uid).get().then(res => {
        commit('setProfile', res.data());
      }).catch(error => {
        console.error(error);
      });
    },
    clear({commit}){
      commit('setUser', null);
      commit('setProfile',{});
    }
  },
  modules: {
  },
});

export default store;

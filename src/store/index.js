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

    },
    setProfile (state, value){

    },
  },
  actions: {
    getUserProfile ({commit, state}){

    },
  },
  modules: {
  },
});

export default store;

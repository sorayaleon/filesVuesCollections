import Vue from 'vue';
import Vuex from 'vuex';

const fb = require ('../firebase.js');

Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
  if(user){
    store.commit('setUser', user);
    store.dispatch('getUserProfile');
  }

  fb.commentCollection.orderBy('when', 'desc').onSnapshot(querySnapshot => {
    let comments = [];
    querySnapshot.forEach(doc => {
      let comment = doc.data();
      comment.id = doc.id;
      comments.push(comment);
    });
    store.commit('setComments', comments);
  });

  fb.resourcesCollection.orderBy('votes', 'desc').limit(5).onSnapshot(querySnapshot => {
    let resources = [];
    querySnapshot.forEach(doc => {
      let resource = doc.data();
      resource.id = doc.id;
      resources.push(resource);
    });
    store.commit('setTopResources', resources);
  });

  fb.resourcesCollection.orderBy('when', 'desc').onSnapshot(querySnapshot => {
    let self = false;
    let resources = [];

    if(store.state.user && querySnapshot.docs.length){
      self = (store.state.user.uid === querySnapshot.docChanges()[0].doc.data().userId);
    }

    if (querySnapshot.docChanges().length !== querySnapshot.docs.length && querySnapshot.docChanges()[0].type == 'added' && !self){
        let resource = querySnapshot.docChanges()[0].doc.data();
        resource.id = querySnapshot.docChanges()[0].doc.id;

        if(!store.state.otherResources.some(other => other.id === resource.id)){
          store.commit('setOther', resource);
        }
    }else {
      querySnapshot.forEach(doc => {
        let resource = doc.data();
        resource.id = doc.id;
        resources.push(resource);
      });
      store.commit('setResources', resources);
    }
  });
});

 const store = new Vuex.Store({
  state: {
    user: null,
    profile: {},
    resources: [],
    topResources: [],
    otherResources: [],
    comments: [],
  },
  mutations: {
    setUser (state, value){
      state.user = value;
    },
    setProfile (state, value){
      state.profile = value;
    },
    setResources (state, value) {
      state.resources = value;
    },
    setTopResources(state, value) {
      state.topResources = value;
    },
    setComments (state, value) {
      state.comments = value;
    },
    setOther (state, value) {
      state.otherResources.unshift(value);
    },
    clearOthers(state){
      state.otherResources = [];
    }
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

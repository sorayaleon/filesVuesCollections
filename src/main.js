import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const fb = require('./firebase.js');

require('./assets/main.scss');

Vue.config.productionTip = false;

var app;
fb.auth.onAuthStateChanged(() => {
  if(!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

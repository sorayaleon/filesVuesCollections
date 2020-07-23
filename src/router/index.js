import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from "firebase";
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Recover from '../views/Recover.vue';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta:{
        authorization: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        publicc: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        publicc: true,
      }
    },
    {
      path: '/recover',
      name: 'recover',
      component: Recover,
      meta: {
        publicc: true,
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authorization = to.matched.some(destination => destination.meta.authorization);
  const publicc = to.matched.some(destination => destination.meta.public);
  const currentUser = firebase.auth().currentUser;

  if(authorization &&!currentUser){
    console.log('Requires authentication and is not registered');
    next('/login');
  } else if(publicc && currentUser){
    console.log('doesn\'t require authentication and is registered');
    next('/');
  } else if(authorization && currentUser){
    console.log('Requires authentication and is registered')
    next();
  } else {
    next();
  }
});

export default router;

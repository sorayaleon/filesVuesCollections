import firebase from "firebase";
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCRPVkquOcYuJl8i2tU640ktywVNyyKV5c",
  authDomain: "vuefilos-ebc8b.firebaseapp.com",
  databaseURL: "https://vuefilos-ebc8b.firebaseio.com",
  projectId: "vuefilos-ebc8b",
  storageBucket: "vuefilos-ebc8b.appspot.com",
  messagingSenderId: "399053134012",
  appId: "1:399053134012:web:61de81c725aed3152f18b9"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const user = auth.currentUser;

const usersCollection = db.collection(  'users');
const resourcesCollection = db.collection( 'resources');
const commentCollection = db.collection(  'comment');
const votesCollection = db.collection( 'votes');

export {
  db,
  auth,
  user,
  usersCollection,
  resourcesCollection,
  commentCollection,
  votesCollection
}

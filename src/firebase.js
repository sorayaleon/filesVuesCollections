import firebase from "firebase";
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDjldXjDe5eVTdF2w4iyCe61M0uMsy7g-M",
  authDomain: "filesvuescollections.firebaseapp.com",
  databaseURL: "https://filesvuescollections.firebaseio.com",
  projectId: "filesvuescollections",
  storageBucket: "",
  messagingSenderId: "218458213344",
  appId: "1:218458213344:web:b6e1d08586ccd8867cf985",
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

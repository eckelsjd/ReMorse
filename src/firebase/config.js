import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUtqMEoK7zpgy03I-szSYmDZBcFrfAjo8",
  authDomain: "remorse-a81f7.firebaseapp.com",
  databaseURL: "https://remorse-a81f7-default-rtdb.firebaseio.com",
  projectId: "remorse-a81f7",
  storageBucket: "remorse-a81f7.appspot.com",
  messagingSenderId: "807266211780",
  appId: "1:807266211780:web:cffe18c6183f69cc5af691",
  measurementId: "G-HT1XHM454H",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

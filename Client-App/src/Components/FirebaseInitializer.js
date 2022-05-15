
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBBkLsQDhZ3U1uWYap63SrmVjvZZkdEZeA",
    authDomain: "discussion-manager.firebaseapp.com",
    databaseURL: "https://discussion-manager-default-rtdb.firebaseio.com",
    projectId: "discussion-manager",
    storageBucket: "discussion-manager.appspot.com",
    messagingSenderId: "445650446085",
    appId: "1:445650446085:web:f387dbbfaa64b131f9b96c"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
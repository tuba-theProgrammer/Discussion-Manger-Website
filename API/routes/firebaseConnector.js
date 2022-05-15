const admin = require('firebase-admin');
const firebase = require('firebase');
var serviceAccount = require("./discussion-manager-firebase-adminsdk-xyc04-886ef0cb3d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://discussion-manager-default-rtdb.firebaseio.com"
});
var firebaseConfig = {
  apiKey: "AIzaSyBBkLsQDhZ3U1uWYap63SrmVjvZZkdEZeA",
  authDomain: "discussion-manager.firebaseapp.com",
  databaseURL: "https://discussion-manager-default-rtdb.firebaseio.com",
  projectId: "discussion-manager",
  storageBucket: "discussion-manager.appspot.com",
  messagingSenderId: "445650446085",
  appId: "1:445650446085:web:f387dbbfaa64b131f9b96c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// module.exports=firebase;
// module.exports=admin;
module.exports={
  firebase,
  admin,
  firebaseConfig
}
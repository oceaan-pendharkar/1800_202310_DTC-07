//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBidO_lZNGfC9RJo-S3V9Lb-E3vNknGhP8",
  authDomain: "dtc07-4a4f6.firebaseapp.com",
  projectId: "dtc07-4a4f6",
  storageBucket: "dtc07-4a4f6.appspot.com",
  messagingSenderId: "619291419634",
  appId: "1:619291419634:web:8b0e51e21e534df4f9016b"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
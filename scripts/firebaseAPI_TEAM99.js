//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCia9rtaN66AFuCKHtShnSEOKGKXmkA07k",
    authDomain: "fir-9cbc1.firebaseapp.com",
    projectId: "fir-9cbc1",
    storageBucket: "fir-9cbc1.appspot.com",
    messagingSenderId: "1057930364151",
    appId: "1:1057930364151:web:a27fefda0fe5b6181bbff2"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const firebase = require('firebase/app'); require('firebase/auth'); require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyBveBpSR1NDenJIfOOxas0cP9Q1m7Nmveg",
  authDomain: "team13agile-eaf43.firebaseapp.com",
  projectId: "team13agile-eaf43",
  storageBucket: "team13agile-eaf43.appspot.com",
  messagingSenderId: "637454875604",
  appId: "1:637454875604:web:c3ff6da6d4a8e125eeb441",
  measurementId: "G-67HMP94YCL"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
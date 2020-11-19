import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyBI6n9PdjAqnLsHCHenvasVDXVqAWE3S0Q",
    authDomain: "school-attendance-app-bc1d5.firebaseapp.com",
    databaseURL: "https://school-attendance-app-bc1d5.firebaseio.com",
    projectId: "school-attendance-app-bc1d5",
    storageBucket: "school-attendance-app-bc1d5.appspot.com",
    messagingSenderId: "1071770895968",
    appId: "1:1071770895968:web:9d2e8198b75d45b3eea505"
  };
  firebase.initializeApp(firebaseConfig);

export default firebase.database();
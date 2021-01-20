import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {firebaseConfig} from './firebase.config.js';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

firebase.initializeApp(firebaseConfig);

// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserWithEmailAndPassword = (email, password, alertFn) => {
   firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
      console.log("register user", user);
      alertFn({
        type : "SUCCESS",
        title : "Successfully processed",
        message : "User account created."
    })
    // Signed in 
    // ...
    console.log("user is created successfully", user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alertFn({
      type : "WARN",
      title : "Alert",
      message : "Something went wrong",
  }
  )
    // ..
  });

}

export const signInWithEmailAndPassword  = (email, password, alertFn) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in 
    // ...
    alertFn({
      type : "SUCCESS",
      title : "Successfully processed",
      message : "User account loggedIn."
  })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alertFn({
      type : "WARN",
      title : "Alert",
      message : "Incorrect email id and password.",
  }
  )
  });

}


export const signOut = () => {
    firebase.auth().signOut().then(() => {
        history.push('/account');
      }).catch((error) => {
        // An error happened.
      });
}

export const isAuthenticated = () => { return firebase.auth();}

export default firebase;
// export const getAuthToken = firebase?.auth()?.currentUser?.getIdToken(); 

// export const getUserInformation = firebase.auth().currentUser;

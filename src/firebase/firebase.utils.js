import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAo7Tet37TWhhDhlGY_61e7DRgd55zg0FY",
    authDomain: "crwn-db-4923a.firebaseapp.com",
    databaseURL: "https://crwn-db-4923a.firebaseio.com",
    projectId: "crwn-db-4923a",
    storageBucket: "crwn-db-4923a.appspot.com",
    messagingSenderId: "355708303214",
    appId: "1:355708303214:web:3e513be6e7ba36e97d337f"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

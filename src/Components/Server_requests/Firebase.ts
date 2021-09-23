import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { checkUserIfAuthorize, Log } from "../Shared/Utility";

const firebaseApp = {
  apiKey: process.env.REACT_APP_FIREBASE_APP_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseApp);
export const auth = getAuth();

export const getAuthentication =()=>{
  return new Promise<number>((resolve, reject) => {
      if(auth && auth.currentUser && checkUserIfAuthorize(auth.currentUser.uid)){
          resolve(200)
      } else {
          Log('Unauthorized: ');
          reject(401)
      } 
  })
}

export const SignUp = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Log(
          `Successfully signing up: ${JSON.stringify(
            userCredential.user,
            null,
            1
          )}`,
          null
        );
        resolve(userCredential.user);
      })
      .catch((error) => {
        Log(`Error on SignUp:`, error);
        reject(error);
      });
  });
};

export const SignIn = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Log(
          `Successfully signing in: ${JSON.stringify(
            userCredential.user,
            null,
            1
          )}`
        );
        resolve(200);
      })
      .catch((error) => {
        Log(`Error on SignIn:`, error);
        reject(error);
      });
  });
};

export const SignOut = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve(200);
        Log(`Successfully signing out:`, null);
      })
      .catch((error) => {
        Log(`Error on SignOut:`, error);
        reject(error);
      });
  });
};

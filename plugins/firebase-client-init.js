import { getApp, getApps, initializeApp } from 'firebase/app';
import { RecaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  updateCurrentUser,
  signInWithCustomToken,
  getIdToken,
  signOut,
  onAuthStateChanged,
  onIdTokenChanged
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  child,
  orderByChild,
  equalTo,
  push,
  update,
  onValue,
  get
} from 'firebase/database';
import { getStorage, getDownloadURL, uploadByteResumable } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default function (context, inject) {
  const config = {};

  const app = !getApps().length ? initializeApp(config) : getApp();

  const appCheck = initializeAppCheck(app, {
    provider: new RecaptchaV3Provider(''),
    isAutoRefreshToken: true
  });

  const auth = getAuth(app);
  const database = getDatabase(app);
  const storage = getStorage(app);
  const functions = getFunctions(app, 'us-central1');

  context.app.$fire = {
    appCheck,
    $auth: {
      auth,
      createUserWithEmailAndPassword,
      sendEmailVerification,
      signInWithEmailAndPassword,
      signInWithPhoneNumber,
      RecaptchaVerifier,
      linkWithPhoneNumber,
      updateCurrentUser,
      signInWithCustomToken,
      getIdToken,
      signOut,
      onAuthStateChanged,
      onIdTokenChanged
    },
    $db: {
      database,
      ref,
      child,
      orderByChild,
      equalTo,
      push,
      update,
      onValue,
      get
    },
    $storage: {
      storage,
      getDownloadURL,
      uploadByteResumable
    }
  };
  
  return inject('$fire', {
    $auth: {
      auth,
      createUserWithEmailAndPassword
    }
  });
}

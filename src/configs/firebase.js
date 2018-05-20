import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAEgyGO-OpQu8UHVfEXJmaHGoT8x0O8DVk",
  authDomain: "group6-263d5.firebaseapp.com",
  databaseURL: "https://group6-263d5.firebaseio.com",
  projectId: "group6-263d5",
  storageBucket: "group6-263d5.appspot.com",
  messagingSenderId: "1094702697315"
};

const firebaseConfig = firebase.initializeApp(config);
export const database = firebaseConfig.database();

export default firebaseConfig;
// export {
//   database,
// };
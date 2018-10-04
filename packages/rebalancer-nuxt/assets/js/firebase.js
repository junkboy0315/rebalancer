import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAoqjBH-8xZWaY-PkuMsL0BJjhreYp8zxw',
  authDomain: 'rebalancer-218123.firebaseapp.com',
  databaseURL: 'https://rebalancer-218123.firebaseio.com',
  projectId: 'rebalancer-218123',
  storageBucket: 'rebalancer-218123.appspot.com',
  messagingSenderId: '279575238032',
};

// to prevent double initialization
let f;
if (!firebase.apps.length) {
  f = firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });
} else {
  f = firebase.app();
}

export default f;

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// to prevent double initialization
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyAoqjBH-8xZWaY-PkuMsL0BJjhreYp8zxw',
    authDomain: 'rebalancer-218123.firebaseapp.com',
    databaseURL: 'https://rebalancer-218123.firebaseio.com',
    projectId: 'rebalancer-218123',
    storageBucket: 'rebalancer-218123.appspot.com',
    messagingSenderId: '279575238032',
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });
}

export default firebase;

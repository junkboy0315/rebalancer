const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp();
const db = firebaseAdmin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

exports.cleanupUserData = functions.auth.user().onDelete(user => {
  return db
    .collection('portfolios')
    .where('owner', '==', user.uid)
    .get()
    .then(snapshot => {
      var batch = db.batch();
      snapshot.forEach(doc => batch.delete(doc.ref));
      return batch.commit();
    })
    .then(console.log('cleanup succeed'))
    .catch(err => console.log('cleanup  (partially) failed', err));
});

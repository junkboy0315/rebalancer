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

exports.cleanupAnonymousAccounts = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') return res.sendStatus(404);

  function deleteAnonymousUsers(nextPageToken) {
    firebaseAdmin
      .auth()
      .listUsers(500, nextPageToken)
      .then(listUsersResult => {
        console.log('listUsersResult:', listUsersResult);
        listUsersResult.users.forEach(function(userRecord) {
          if (userRecord.providerData.length === 0) {
            //this user is anonymous
            console.log('deleting:', userRecord); // do your delete here
            firebaseAdmin
              .auth()
              .deleteUser(userRecord.uid)
              .then(() => {
                console.log('Successfully deleted user');
              })
              .catch(error => {
                console.log('Error deleting user:', error);
              });
          }
        });
        console.log('pageToken:', listUsersResult.pageToken);
        if (listUsersResult.pageToken) {
          deleteAnonymousUsers(listUsersResult.pageToken);
        }
      })
      .catch(function(error) {
        console.log('Error listing users:', error);
      });
  }

  deleteAnonymousUsers();
  res.sendStatus(200);
});

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

exports.cleanupAnonymousAccounts = functions.https.onRequest(
  async (req, res) => {
    if (req.method !== 'POST') return res.sendStatus(404);

    const deleteAnonymousUsers = async nextPageToken => {
      const userList = await firebaseAdmin
        .auth()
        .listUsers(500, nextPageToken)
        .catch(err => {
          console.log('Error listing users:', err);
          throw Error(err);
        });

      console.log('listUsersResult:', userList);

      for (user of userList.users) {
        if (user.providerData.length === 0) {
          //this user is anonymous
          console.log('deleting:', user); // do your delete here
          await firebaseAdmin
            .auth()
            .deleteUser(user.uid)
            .catch(error => {
              console.log('Error deleting user:', error);
            });

          console.log('Successfully deleted user');
        }
      }

      console.log('pageToken:', userList.pageToken);

      if (userList.pageToken) {
        await deleteAnonymousUsers(userList.pageToken);
      }
    };

    await deleteAnonymousUsers();

    res.sendStatus(200);
  }
);

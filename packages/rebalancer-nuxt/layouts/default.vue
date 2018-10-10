<template>
  <div>
    <Navbar/>
    <div class="container child-contents">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';
import firebase from '~/assets/js/firebase';

const db = firebase.firestore();

export default {
  components: { Navbar },
  async mounted() {
    // when firebase auth is ready
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // User is signed in. (including anonymous user)
      } else {
        // No user is signed in.
        await firebase.auth().signInAnonymously();
      }

      // update `state.portfolios` everytime firebase value changes
      db.collection('portfolios')
        .where('owner', '==', user.uid)
        .onSnapshot(snapshot => {
          const portfolios = snapshot.docs.map(_ => {
            return {
              id: _.id,
              ..._.data(),
            };
          });

          this.$store.commit({
            type: 'setPortfolios',
            portfolios,
          });
        });
    });
  },
};
</script>

<style lang="scss">
.child-contents {
  padding: 50px 16px 0;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
}
</style>

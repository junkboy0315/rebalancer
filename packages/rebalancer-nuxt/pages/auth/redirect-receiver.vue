<template>
  <section>
    <Spinner class="spinner" background="#d84f00"/>ログイン中...
  </section>
</template>

<script>
import firebase from '~/assets/js/firebase';
import Spinner from '~/components/Spinner';

export default {
  components: {
    Spinner,
  },
  mounted() {
    var credential = firebase.auth.GoogleAuthProvider.credential(this.idToken);

    this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user && user.isAnonymous) {
        // Upgrade anonymous account
        const usercred = await firebase
          .auth()
          .currentUser.linkAndRetrieveDataWithCredential(credential)
          .catch(async err => {
            /**
             * Try normal Google login if upgrading anonymous account fails
             *
             * Reasons:
             * - 匿名アカウントに対し、すでにFirebase上に存在するGoogleアカウントをリンクしようとした。
             *   （既存登録利用者のLocalStorageが消えた、あるいは新しいブラウザでログインした場合など）
             *   {code: "auth/credential-already-in-use", message: "This credential is already associated with a different user account.", email: "some@email.com", credential: Lf}
             */
            await firebase
              .auth()
              .signInAndRetrieveDataWithCredential(credential);
          });
      } else {
        // normal login
        await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      }
      this.$router.push('/portfolio');
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  computed: {
    // extract id_token from url hash
    idToken() {
      let parsedParams = {};
      this.$route.hash
        .split('&')
        .map(part => part.replace(/#/, ''))
        .forEach(param => {
          const parts = param.split('=');
          parsedParams[parts[0]] = parts[1];
        });

      return parsedParams.id_token;
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  margin-right: 1rem;
}
</style>

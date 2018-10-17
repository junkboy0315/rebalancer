<template>
  <section class="account">
    <h1>Account</h1>
    <div class="card">
      <div class="card-content">
        <div class="line">
          <span class="has-text-weight-bold my-label">Account Type:</span>
          {{ isAnonymous ? 'Anonymous' : 'Google Account'}}
        </div>
        <div class="line">
          <span class="has-text-weight-bold my-label">Registered Email:</span>
          {{ email ? email : 'not available' }}
        </div>
        <SignupRecommender/>
      </div>
      <template v-if="!isAnonymous">
        <Divider/>
        <div class="card-content is-flex">
          <button @click="signOut" class="button">Sign Out</button>
          <button @click="deleteAccount" class="button is-danger">Delete This Account</button>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import firebase from '~/assets/js/firebase';
import SignupRecommender from '~/components/SignupRecommender';
import Divider from '~/components/Divider';

export default {
  components: {
    SignupRecommender,
    Divider,
  },
  mounted() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user && !user.isAnonymous) {
        this.isAnonymous = false;
        this.email = user.email;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    async signOut() {
      await firebase.auth().signOut();
      this.$router.push('/');
    },
    async deleteAccount() {
      try {
        if (!confirm('Are you sure to delete this account?')) return;
        await firebase.auth().currentUser.delete();
        alert('Deleted your acount.');
        this.$router.push('/');
      } catch (err) {
        if (err.code === 'auth/requires-recent-login')
          return alert(
            'Re-authentication is required to delete account. Please sign out and sign in, and do the same operation again.'
          );
        throw Error(err);
      }
    },
  },
  data() {
    return {
      isAnonymous: true,
      email: '',
    };
  },
};
</script>

<style scoped lang="scss">
.my-label {
  margin-right: 1rem;
}

.line {
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}

.is-flex {
  flex-wrap: wrap;
  margin: -6px;
  > * {
    margin: 6px;
  }
}
</style>

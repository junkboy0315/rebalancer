<template>
  <section class="account">
    <h1>Account</h1>
    <div class="card">
      <div class="card-content">
        <div class="line">
          <span class="has-text-weight-bold my-label">アカウントの種類:</span>
          {{ isAnonymous ? '匿名ユーザ' : 'Googleアカウントでの登録済みユーザ'}}
        </div>
        <div class="line">
          <span class="has-text-weight-bold my-label">登録メールアドレス:</span>
          {{ email ? email : 'なし' }}
        </div>
        <SignupRecommender/>
        <template v-if="!isAnonymous">
          <div class="line">
            <button @click="signOut" class="button">サインアウトする</button>
          </div>
          <div class="line">
            <button @click="deleteAccount" class="button is-danger">アカウントを削除する</button>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from '~/assets/js/firebase';
import SignupRecommender from '~/components/SignupRecommender';

export default {
  components: {
    SignupRecommender,
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
        await firebase.auth().currentUser.delete();
        alert('アカウントを削除しました');
        this.$router.push('/');
      } catch (err) {
        if (err.code === 'auth/requires-recent-login')
          return alert(
            'アカウントの削除を行うには再認証が必要です。一度サインアウトした後にもう一度サインインして、同じ操作を行ってください。'
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
</style>

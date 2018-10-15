<template>
  <div v-if="isAnonymous" class="notification is-warning">
    <span>あなたは現在「匿名ユーザ」のため、入力したデータは毎日0時に削除されます。データを保存しておきたい場合は
      <SignupLink text="Googleアカウントでログイン"/>してください。
    </span>
  </div>
</template>

<script>
import firebase from '~/assets/js/firebase';
import SignupLink from '~/components/SignupLink';

export default {
  components: {
    SignupLink,
  },
  mounted() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.isAnonymous = user.isAnonymous;
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  data() {
    return {
      isAnonymous: true,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>

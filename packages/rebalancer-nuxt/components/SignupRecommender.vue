<template>
  <div v-if="isAnonymous" class="notification is-warning">
    <span>あなたは現在「匿名ユーザ」のため、入力したデータは失われる可能性があります。データを保存しておきたい場合は
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
    this.isAnonymous = firebase.auth().currentUser.isAnonymous;
  },
  data() {
    return {
      isAnonymous: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>

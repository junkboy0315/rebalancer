<template>
  <div v-if="isAnonymous" class="notification is-warning">
    <SignupLink text="Log in with your Google account now."/>
    <p>
      <br>Otherwise your data is deleted at 0 o'clock everyday.
    </p>
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

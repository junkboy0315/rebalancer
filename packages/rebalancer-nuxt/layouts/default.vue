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

export default {
  components: { Navbar },
  async mounted() {
    await firebase.auth().signInAnonymously();
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

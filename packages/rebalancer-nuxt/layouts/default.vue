<template>
  <div>
    <Navbar />
    <div class="container child-contents">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';

export default {
  components: { Navbar },
};
</script>

<style lang="scss">
.child-contents {
  padding: 50px 16px 0;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>

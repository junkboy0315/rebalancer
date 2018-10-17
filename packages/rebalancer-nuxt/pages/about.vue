<template>
  <section class="about">
    <h1>About</h1>
    <div class="card">
      <div class="card-content">
        <p>
          This site was created by
          <a href="https://www.yuuniworks.com">Yuuniworks</a>.
          Although it is a sample service developed for business talks,
          you can use it freely within the scope of the following terms of service.
        </p>
      </div>
      <Divider/>
      <div class="card-content">
        <div class="kiyaku" v-html="termsOfService"/>
      </div>
    </div>
  </section>
</template>

<script>
import Divider from '~/components/Divider';
import termsOfService from '~/assets/termsOfService.md';
export default {
  components: {
    Divider,
  },
  data() {
    return {
      termsOfService,
    };
  },
};
</script>

<style lang="scss">
.about {
  .kiyaku {
    line-height: 1.7;

    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1rem;
      font-weight: bold;
      margin-top: 1rem;
    }
    ol {
      padding-left: 1rem;
    }
    ol li ol {
      padding-left: 2rem;
    }
    ol li ol li {
      list-style-type: lower-roman;
    }
  }
}
</style>

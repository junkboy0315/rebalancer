<template>
  <section class="about">
    <h1>About</h1>
    <div class="card">
      <div class="card-content">
        <p>
          このサイトは
          <a href="https://www.yuuniworks.com">Yuuniworks</a>が作成したものです。
          商談用に開発したサンプルのサービスではありますが、下記の利用規約の範囲内で自由にお使いいただけます。
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

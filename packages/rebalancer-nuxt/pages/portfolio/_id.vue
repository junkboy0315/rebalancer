<template>
  <section class="portfolio">

    <h1>Portfolio > Portfolio1</h1>

    <AssetClassCard class="asset-class-card" />
    <AssetClassCard class="asset-class-card" />
    <AssetClassCardNew />

  </section>
</template>

<script>
import AssetClassCard from '~/components/AssetClassCard';
import AssetClassCardNew from '~/components/AssetClassCardNew';

export default {
  components: { AssetClassCard, AssetClassCardNew },
};
</script>

<style lang="scss" scoped>
.portfolio {
  .asset-class-card {
    margin-bottom: 28px;
  }
}
</style>

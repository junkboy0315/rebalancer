<template>
  <section class="portfolio">

    <template v-if="!query.mode">
      <h1>Portfolio > Portfolio1 </h1>

      <AssetClassCard class="asset-class-card" />
      <AssetClassCard class="asset-class-card" />
      <AssetClassCardNew />
    </template>

    <template v-if="query.mode==='rebalance'">
      <h1>Portfolio > Portfolio1 > Rebalance</h1>

      <RebalanceSetting />
    </template>

    <template v-if="query.mode==='rebalance-result'">
      <h1>Portfolio > Portfolio1 > Rebalance-Result</h1>
    </template>

  </section>
</template>

<script>
import AssetClassCard from '~/components/AssetClassCard';
import AssetClassCardNew from '~/components/AssetClassCardNew';
import RebalanceSetting from '~/components/RebalanceSetting';

export default {
  components: { AssetClassCard, AssetClassCardNew, RebalanceSetting },
  data() {
    return {
      query: this.$route.query,
    };
  },
  watchQuery: ['mode'],
};
</script>

<style lang="scss" scoped>
.portfolio {
  .asset-class-card {
    margin-bottom: 28px;
  }
}
</style>

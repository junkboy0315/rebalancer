<template>
  <section class="portfolio">

    <template v-if="!query.mode">
      <div class="top-line">
        <h1>Portfolio > Portfolio1 </h1>
        <nuxt-link to="?mode=rebalance" class="button is-primary">リバランスを実行する</nuxt-link>
      </div>

      <AssetClassCard class="asset-class-card" />
      <AssetClassCard class="asset-class-card" />
      <AssetClassCardNew />
    </template>

    <template v-if="query.mode==='rebalance'">
      <h1>Portfolio > Portfolio1 > Rebalance</h1>

      <RebalanceSetting />
    </template>

    <template v-if="query.mode==='rebalance-result'">
      <div class="top-line">
        <h1>Portfolio > Portfolio1 > Rebalance-Result</h1>
        <nuxt-link to="?mode=rebalance" class="button is-primary">リバランスを実行する</nuxt-link>
      </div>

      <RebalanceResult />
    </template>

  </section>
</template>

<script>
import AssetClassCard from '~/components/AssetClassCard';
import AssetClassCardNew from '~/components/AssetClassCardNew';
import RebalanceSetting from '~/components/RebalanceSetting';
import RebalanceResult from '~/components/RebalanceResult';

export default {
  components: {
    AssetClassCard,
    AssetClassCardNew,
    RebalanceSetting,
    RebalanceResult,
  },
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
  .top-line {
    display: flex;
    justify-content: space-between;
  }

  .asset-class-card {
    margin-bottom: 28px;
  }
}
</style>

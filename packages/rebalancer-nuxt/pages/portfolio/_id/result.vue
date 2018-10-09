<template>
  <section class="portfolio">
    <div class="top-line">
      <h1>Portfolio > Portfolio1 > Rebalance-Result</h1>
      <nuxt-link to="?mode=rebalance" class="button is-primary">リバランスを実行する</nuxt-link>
    </div>
    <RebalanceResult/>
  </section>
</template>

<script>
import RebalanceSetting from '~/components/RebalanceSetting';
import RebalanceResult from '~/components/RebalanceResult';

export default {
  components: {
    RebalanceSetting,
    RebalanceResult,
  },
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

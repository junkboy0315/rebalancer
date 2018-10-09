<template>
  <section class="portfolio">
    <h1>Portfolio > Portfolio1 > Rebalance</h1>
    <RebalanceSetting/>
  </section>
</template>

<script>
import RebalanceSetting from '~/components/RebalanceSetting';

export default {
  components: {
    RebalanceSetting,
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

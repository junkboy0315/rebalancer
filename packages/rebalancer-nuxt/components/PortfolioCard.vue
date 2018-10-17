<template>
  <nuxt-link :to="'/portfolio/'+ portfolio.id" class="card">
    <div class="card-content is-flex">
      <div class="icon">
        <i class="fas fa-chart-pie"></i>
      </div>
      <div class="contents-column">
        <div class="portfolio-title">{{ portfolio.name }}</div>
        <PortfolioCardLiner title="Total" :value="total"/>
        <PortfolioCardLiner title="Asset Classes" :value="numberOfAssetClass"/>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import PortfolioCardLiner from '~/components/PortfolioCardLiner';
import { getCommaNumber } from '~/utils';

export default {
  props: { portfolio: { type: Object, required: true } },
  components: { PortfolioCardLiner },
  computed: {
    total() {
      const totalsOfEachAssetClass = this.portfolio.assetClasses.map(_ =>
        _.assets.reduce((acc, next) => acc + next.amount, 0)
      );
      const total = totalsOfEachAssetClass.reduce((acc, next) => acc + next, 0);
      return getCommaNumber(total);
    },
    numberOfAssetClass() {
      return this.portfolio.assetClasses.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  min-height: 164px;
  padding-right: 1.5rem;
  &:hover {
    cursor: pointer;
  }

  .icon {
    font-size: 2rem;
    color: #d84f00;
    margin-right: 1rem;
  }

  .contents-column {
    flex: 1 0 auto;
    padding-top: 2px;
  }

  .portfolio-title {
    font-weight: bold;
    margin-bottom: 16px;
  }
}
</style>

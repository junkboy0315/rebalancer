<template>
  <nuxt-link to="/portfolio/1234" class="card">
    <div class="card-content is-flex">

      <div class="icon"><i class="fas fa-chart-pie"></i></div>
      <div class="contents-column">
        <div class="portfolio-title">Portfolio1</div>
        <PortfolioCardLiner title="総額" value="1,358,000円" />
        <PortfolioCardLiner title="乖離度" value="低い" />
        <PortfolioCardLiner title="アセットクラス数" value="3" />
      </div>

    </div>
  </nuxt-link>
</template>

<script>
import PortfolioCardLiner from '~/components/PortfolioCardLiner';

export default {
  components: { PortfolioCardLiner },
};
</script>

<style lang="scss" scoped>
.card {
  min-height: 244px;
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

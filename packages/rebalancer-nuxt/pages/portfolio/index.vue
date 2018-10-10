<template>
  <section class="portfolio">
    <h1>Portfolio</h1>
    <div class="portfolio-grid">
      <PortfolioCard v-for="portfolio in portfolios" :key="portfolio.id" :portfolio="portfolio"/>
      <nuxt-link to="/portfolio/new" class="card add-portfolio">
        <div class="card-content">
          <div class="">
            <i class="fas fa-plus"></i>
          </div>
          <div class="">ポートフォリオを
            <br>新規作成する
          </div>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import PortfolioCard from '~/components/PortfolioCard';

export default {
  components: { PortfolioCard },
  computed: {
    ...mapState(['portfolios']),
  },
};
</script>

<style scoped lang="scss">
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 1rem;
}

.add-portfolio {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  box-shadow: none;
  border: 1px dotted #ccc;

  &:hover {
    background: white;
    cursor: pointer;
  }

  .card-content {
    text-align: center;
    color: #d84f00;

    i {
      font-size: 3rem;
      margin-bottom: 20px;
    }
  }
}
</style>

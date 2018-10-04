<template>
  <section class="portfolio">

    <h1>Portfolio</h1>

    <div class="portfolio-grid">
      <PortfolioCard v-for="portfolio in portfolios" :key="portfolio.id" :portfolio="portfolio" />

      <nuxt-link to="/portfolio/new" class="card add-portfolio">
        <div class="card-content">
          <div class=""><i class="fas fa-plus"></i></div>
          <div class="">ポートフォリオを<br/>新規作成する</div>
          </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import PortfolioCard from '~/components/PortfolioCard';
import firebase from '~/assets/js/firebase';

const db = firebase.firestore();

export default {
  mounted() {
    firebase.auth().onAuthStateChanged(async user => {
      const portfolios = await db
        .collection('portfolios')
        .where('owner', '==', user.uid)
        .get();

      portfolios.forEach(_ =>
        this.portfolios.push({
          id: _.id,
          ..._.data(),
        })
      );
      console.log(this.portfolios);
    });
  },
  components: { PortfolioCard },
  data() {
    return {
      portfolios: [],
    };
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

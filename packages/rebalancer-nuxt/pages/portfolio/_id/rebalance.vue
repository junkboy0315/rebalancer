<template>
  <section class="portfolio">
    <div class="top-line">
      <nav v-if="portfolio" class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/portfolio">Portfolio</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/portfolio/${portfolio.id}`">{{portfolio.name}}</nuxt-link>
          </li>
          <li class="is-active">
            <a href="#">Rebalance Settings</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="card">
      <div class="liner">
        <div class="has-text-weight-bold">Amount to Add (or Sell)</div>
        <input v-model="adjust" class="input" type="number" placeholder="">
      </div>
      <div class="liner">
        <div class="has-text-weight-bold">Rebalance Type</div>
        <div>
          <label class="radio">
            <input type="radio" id="sell" value="sell" v-model="rebalanceType">
            <span>Selling Rebalance</span>
          </label>
          <br>
          <label class="radio">
            <input type="radio" id="nosell" value="nosell" v-model="rebalanceType">
            <span>No-selling Rebalance</span>
          </label>
        </div>
      </div>
      <div class="liner">
        <button @click="doRebalance" class="button is-primary">Rebalance</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      adjust: 0,
      rebalanceType: 'sell',
    };
  },
  computed: {
    portfolio() {
      return this.$store.getters.portfolioById(this.$route.params.id);
    },
  },
  methods: {
    doRebalance() {
      if (this.adjust === 0 && this.rebalanceType === 'nosell')
        return alert('Please enter the amount to do the no-selling rebalance.');
      this.$router.push(
        `/portfolio/${this.$route.params.id}/result?rebalanceType=${
          this.rebalanceType
        }&adjust=${this.adjust}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.portfolio {
  .top-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    .breadcrumb {
      margin-bottom: 0;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .asset-class-card {
    margin-bottom: 28px;
  }

  .card {
    padding: 42px;

    .liner {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;

      &:last-of-type {
        margin-bottom: 0;
      }

      & > *:first-child {
        width: 14rem;
      }
      & > *:nth-child(2) {
        width: 14rem;
      }

      @media (max-width: 768px) {
        display: block;
      }
    }

    .input {
      width: 10rem;
      vertical-align: baseline;
      text-align: center;
    }
  }
}
</style>

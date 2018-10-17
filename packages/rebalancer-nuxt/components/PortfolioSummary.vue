<template>
  <div class="card" v-if="portfolio">
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <div>Portfolio Name:</div>
          <BaseInput :value="portfolio.name" @change="onPortfolioTitleChange"/>
        </div>
      </div>
      <div class="level">
        <div class="level-left">
          <div>Total:</div>
          <div>{{total}}</div>
        </div>
        <div class="level-right">
          <a @click="onPortfolioDelete(portfolio.id)" class="is-danger">Delete this portfolio</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '~/components/base/BaseInput';
import { getCommaNumber } from '~/utils';
import firebase from '~/assets/js/firebase';

const db = firebase.firestore();

export default {
  components: {
    BaseInput,
  },
  props: { portfolio: { type: Object } },
  computed: {
    total() {
      if (!this.portfolio) return 0;
      const subTotal = this.portfolio.assetClasses.map(_ =>
        _.assets.reduce((acc, next) => acc + next.amount, 0)
      );
      const total = subTotal.reduce((acc, next) => acc + next, 0);
      return getCommaNumber(total);
    },
  },
  methods: {
    async onPortfolioDelete(portfolioId) {
      if (!window.confirm('Are you sure to delete to this portfolio?')) return;
      await db
        .collection('portfolios')
        .doc(this.portfolio.id)
        .delete();

      this.$router.push('/portfolio');
    },
    async onPortfolioTitleChange(name) {
      await db
        .collection('portfolios')
        .doc(this.portfolio.id)
        .update({
          name,
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.level {
  margin-bottom: 0;
}
.card {
  margin-bottom: 2rem;
}
</style>

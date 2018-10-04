<template>
  <section class="portfolio">
    {{ portfolio }}
    <template v-if="!query.mode">
      <div class="top-line">
        <h1>Portfolio > Portfolio1 </h1>
        <nuxt-link to="?mode=rebalance" class="button is-primary">リバランスを実行する</nuxt-link>
      </div>

      <AssetClassCard v-for="assetClass in portfolio.assetClasses" :key="assetClass.id" :assetClass="assetClass" :onAssetClassDelete="onAssetClassDelete" class="asset-class-card" />
      <AssetClassCardNew @click.native="addAssetClass" />
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
import uuid from 'uuid/v4';
import AssetClassCard from '~/components/AssetClassCard';
import AssetClassCardNew from '~/components/AssetClassCardNew';
import RebalanceSetting from '~/components/RebalanceSetting';
import RebalanceResult from '~/components/RebalanceResult';
import firebase from '~/assets/js/firebase';

const db = firebase.firestore();

export default {
  components: {
    AssetClassCard,
    AssetClassCardNew,
    RebalanceSetting,
    RebalanceResult,
  },
  mounted() {
    firebase.auth().onAuthStateChanged(async user => {
      const portfolio = await db
        .doc(`portfolios/${this.$route.params.id}`)
        .get();

      this.portfolio = portfolio.data();
    });
  },
  data() {
    return {
      portfolio: {},
      query: this.$route.query,
    };
  },
  methods: {
    async addAssetClass() {
      this.portfolio.assetClasses.push({ id: uuid(), name: 'domestic!' });
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .set(this.portfolio, { merge: true });
    },
    async onAssetClassDelete(id) {
      this.portfolio.assetClasses = this.portfolio.assetClasses.filter(
        _ => _.id !== id
      );
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .set(this.portfolio, { merge: true });
    },
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

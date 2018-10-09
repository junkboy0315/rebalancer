<template>
  <section class="portfolio">
    <div class="top-line">
      <h1>Portfolio > Portfolio1 > Rebalance-Result</h1>
      <nuxt-link to="?mode=rebalance" class="button is-primary">リバランスを実行する</nuxt-link>
    </div>
    <div class="card">
      <div class="my-container">
        <div class="has-text-weight-bold">リバランスの概要</div>
        <div>今回の投資額: {{ this.$route.query.adjust }}円</div>
        <div>リバランス方針: ノーセルリバランス</div>
      </div>
      <Divider/>
      <div class="my-container">
        <div class="has-text-weight-bold">試算結果</div>
        <div
          v-for="asset in mergedResult"
          :key="asset.id"
        >{{asset.name}}: {{asset.adjust}}円の購入を行ってください</div>
      </div>
      <Divider/>
      <div class="my-container">
        <div class="has-text-weight-bold">リバランス前後のポートフォリオ</div>
        <div>リバランス前</div>
        <div>リバランス後</div>
      </div>
    </div>
  </section>
</template>

<script>
import Divider from '~/components/Divider';
import firebase from '~/assets/js/firebase';

const db = firebase.firestore();

export default {
  components: {
    Divider,
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      db.doc(`portfolios/${this.$route.params.id}`).onSnapshot(async doc => {
        this.portfolio = doc.data();

        const payload = {
          assets: this.assets,
          adjust: +this.$route.query.adjust,
        };
        const result = await this.$axios.$post(
          'https://us-central1-rebalancer-218123.cloudfunctions.net/rebalance',
          payload
        );
        this.calcResult = result;
      });
    });
  },
  computed: {
    total() {
      return this.assets.reduce((acc, next) => acc + next.amount, 0);
    },
    assets() {
      if (!this.portfolio.assetClasses) return [];
      return this.portfolio.assetClasses.map(_ => {
        return {
          id: _.id,
          amount: _.assets.reduce((acc, next) => acc + next.amount, 0),
          targetRate: _.targetRate,
        };
      });
    },
    mergedResult() {
      if (!this.calcResult) return [];
      return this.calcResult.map(_ => {
        const originalData = this.portfolio.assetClasses.find(
          ac => ac.id === _.id
        );
        return {
          ..._,
          amount: originalData.amount,
          name: originalData.name,
          targetRate: originalData.targetRate,
        };
      });
    },
  },
  data() {
    return {
      portfolio: {},
      calcResult: [],
    };
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

.my-container {
  padding: 32px;
}
</style>

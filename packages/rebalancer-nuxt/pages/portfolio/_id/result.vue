<template>
  <section class="portfolio">
    <div class="top-line">
      <h1>Portfolio > Portfolio1 > Rebalance-Result</h1>
      <nuxt-link to="./rebalance" class="button is-primary">リバランスを再試算する</nuxt-link>
    </div>
    <div class="card">
      <div class="my-container">
        <div class="has-text-weight-bold">リバランスの概要</div>
        <div>今回の投資額: {{ getCommaNumber(this.$route.query.adjust) }}円</div>
        <div>リバランス方針: ノーセルリバランス</div>
      </div>
      <Divider/>
      <!-- result -->
      <template v-if="mergedResult.length > 0">
        <div class="my-container">
          <div class="has-text-weight-bold">試算結果</div>
          <div
            v-for="asset in mergedResult"
            :key="asset.id"
          >{{asset.name}}: {{ getCommaNumber(asset.dstAdjust) }}円の購入を行ってください</div>
        </div>
        <Divider/>
        <div v-if="calcResult.length > 0" class="my-container">
          <div class="has-text-weight-bold">リバランス前後のポートフォリオ</div>
          <div class="is-flex">
            <div>
              <div>リバランス前</div>
              <div class="chart-container">
                <MyChart
                  :labels="mergedResult.map(_=>_.name)"
                  :data="mergedResult.map(_=>_.srcAmount)"
                />
              </div>
            </div>
            <div>
              <div>リバランス後</div>
              <div class="chart-container">
                <MyChart
                  :labels="mergedResult.map(_=>_.name)"
                  :data="mergedResult.map(_=>_.dstAmount)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- loading -->
      <template v-if="!(mergedResult.length > 0)">
        <div class="my-container spinner">
          <Spinner background="#d84f00"/>
          <span>Loading...</span>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import Spinner from '~/components/Spinner';
import Divider from '~/components/Divider';
import firebase from '~/assets/js/firebase';
import MyChart from '~/components/MyChart';
import { getCommaNumber } from '~/utils';

const db = firebase.firestore();

export default {
  components: {
    Spinner,
    Divider,
    MyChart,
  },
  async mounted() {
    const portfolio = await db.doc(`portfolios/${this.$route.params.id}`).get();
    this.portfolio = portfolio.data();

    const payload = {
      assets: this.assets,
      adjust: +this.$route.query.adjust,
      mode: this.$route.query.rebalanceType,
    };
    const result = await this.$axios.$post(
      'https://us-central1-rebalancer-218123.cloudfunctions.net/rebalance',
      payload
    );
    this.calcResult = result;
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
          name: originalData.name,
        };
      });
    },
  },
  methods: {
    getCommaNumber(num) {
      return getCommaNumber(num);
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

  .chart-container {
    max-width: 300px;
  }
}

.spinner span {
  margin-left: 1rem;
}
</style>

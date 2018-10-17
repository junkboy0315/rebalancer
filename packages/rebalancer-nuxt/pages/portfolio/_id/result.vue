<template>
  <section v-if="portfolio" class="portfolio">
    <div class="top-line">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/portfolio">Portfolio</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/portfolio/${$route.params.id}`">{{portfolio.name}}</nuxt-link>
          </li>
          <li class="is-active">
            <a href="#">Rebalance Results</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="card">
      <div class="my-container">
        <h1 class="has-text-weight-bold">Rebalance Summary</h1>
        <div>
          <span class="my-label">Amount to Add (or Sell):</span>
          {{ getCommaNumber(this.$route.query.adjust) }}
        </div>
        <div>
          <span class="my-label">Rebalance Type:</span>
          {{ rebalanceModeName }}
        </div>
      </div>
      <Divider/>
      <!-- result -->
      <template v-if="result.length > 0">
        <!-- 試算結果 -->
        <div class="my-container">
          <h1 class="has-text-weight-bold">Results</h1>
          <RebalanceResultSummary :result="result"/>
        </div>
        <Divider/>
        <!-- リバランス前後のポートフォリオ -->
        <div class="my-container">
          <h1 class="has-text-weight-bold">Details</h1>
          <div class="is-flex">
            <div>
              <div class="has-text-weight-bold">Before</div>
              <div class="chart-container">
                <MyChart
                  :labels="result.map(_=> _.name)"
                  :labelsPct="result.map(_=>_.srcCurrentRate)"
                  :data="result.map(_=>_.srcAmount)"
                />
              </div>
            </div>
            <div>
              <div class="has-text-weight-bold">After</div>
              <div class="chart-container">
                <MyChart
                  :labels="result.map(_=> _.name)"
                  :labelsPct="result.map(_=>_.dstCurrentRate)"
                  :data="result.map(_=>_.dstAmount)"
                />
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        <!-- 表 -->
        <div class="my-container">
          <table class="table is-hoverable">
            <thead>
              <tr>
                <th>Asset Class</th>
                <th class="has-text-centered">Amount
                  <br>(Before)
                </th>
                <th>Adjust</th>
                <th class="has-text-centered">Amount
                  <br>(After)
                </th>
                <th class="has-text-centered">Rate
                  <br>(Before)
                </th>
                <th class="has-text-centered">Rate
                  <br>(After)
                </th>
                <th class="has-text-centered">Rate
                  <br>(Target)
                </th>
                <th class="has-text-centered">Deviation
                  <br>(Before)
                </th>
                <th class="has-text-centered">Deviation
                  <br>(After)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res in result" :key="res.key">
                <td>{{res.name}}</td>
                <td class="has-text-right">{{getCommaNumber(res.srcAmount)}}</td>
                <td class="has-text-right">{{getCommaNumber(res.dstAdjust)}}</td>
                <td class="has-text-right">{{getCommaNumber(res.dstAmount)}}</td>
                <td class="has-text-right">{{getFormatedPercentage(res.srcCurrentRate)}}%</td>
                <td class="has-text-right">{{getFormatedPercentage(res.dstCurrentRate)}}%</td>
                <td class="has-text-right">{{getFormatedPercentage(res.targetRate/100)}}%</td>
                <td class="has-text-right">{{getFormatedPercentage(res.srcDeviation-1)}}%</td>
                <td class="has-text-right">{{getFormatedPercentage(res.dstDeviation-1)}}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <!-- loading -->
      <template v-if="!(result.length > 0)">
        <div class="my-container spinner">
          <Spinner background="#d84f00"/>
          <span>Loading...</span>
        </div>
      </template>
    </div>
    <SignupRecommender/>
    <nuxt-link to="./rebalance" class="button is-primary">Estimate Rebalancing Again</nuxt-link>
  </section>
</template>

<script>
import Spinner from '~/components/Spinner';
import Divider from '~/components/Divider';
import SignupRecommender from '~/components/SignupRecommender';
import RebalanceResultSummary from '~/components/RebalanceResultSummary';
import firebase from '~/assets/js/firebase';
import MyChart from '~/components/MyChart';
import { getCommaNumber, getFormatedPercentage } from '~/utils';

const db = firebase.firestore();

export default {
  components: {
    Spinner,
    Divider,
    MyChart,
    SignupRecommender,
    RebalanceResultSummary,
  },
  mounted() {
    // user came here with navigation.
    // portfolio data is already fetched.
    if (this.portfolio) this.getResults();
  },
  computed: {
    portfolio() {
      return this.$store.getters.portfolioById(this.$route.params.id);
    },
    assets() {
      if (!this.portfolio) return [];
      return this.portfolio.assetClasses.map(_ => {
        return {
          id: _.id,
          amount: _.assets.reduce((acc, next) => acc + next.amount, 0),
          targetRate: _.targetRate,
        };
      });
    },
    total() {
      return this.assets.reduce((acc, next) => acc + next.amount, 0);
    },
    rebalanceModeName() {
      if (this.$route.query.rebalanceType === 'sell')
        return 'Selling Rebalance';
      else return 'No-selling Rebalance';
    },
  },
  methods: {
    getCommaNumber(num) {
      return getCommaNumber(num);
    },
    getFormatedPercentage(num) {
      return getFormatedPercentage(num);
    },
    async getResults() {
      // if the portfolio is not loaded yet

      const payload = {
        assets: this.assets,
        adjust: +this.$route.query.adjust,
        mode: this.$route.query.rebalanceType,
      };
      const result = await this.$axios.$post(
        'https://us-central1-rebalancer-218123.cloudfunctions.net/rebalance',
        payload
      );

      this.result = result.map(_ => {
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
  data() {
    return {
      result: [],
    };
  },
  watch: {
    async portfolio(data) {
      // fetch result when the this page is full reloaded.
      // (detect the vuex store data changes)
      this.getResults();
    },
  },
};
</script>

<style lang="scss" scoped>
.portfolio {
  .card {
    margin-bottom: 2rem;
  }
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
}

.my-container {
  padding: 32px;
  overflow-x: auto;

  .chart-container {
    max-width: 300px;
  }
}

.spinner span {
  margin-left: 1rem;
}

.my-label {
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>

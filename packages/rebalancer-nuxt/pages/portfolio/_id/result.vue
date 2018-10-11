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
      <template v-if="result.length > 0">
        <!-- 試算結果 -->
        <div class="my-container">
          <div class="has-text-weight-bold">試算結果</div>
          <div
            v-for="asset in result"
            :key="asset.id"
          >{{asset.name}}: {{ getCommaNumber(asset.dstAdjust) }}円の購入を行ってください</div>
        </div>
        <Divider/>
        <!-- リバランス前後のポートフォリオ -->
        <div class="my-container">
          <div class="has-text-weight-bold">リバランス前後のポートフォリオ</div>
          <div class="is-flex">
            <div>
              <div>リバランス前</div>
              <div class="chart-container">
                <MyChart
                  :labels="result.map(_=> _.name)"
                  :labelsPct="result.map(_=>_.srcCurrentRate)"
                  :data="result.map(_=>_.srcAmount)"
                />
              </div>
            </div>
            <div>
              <div>リバランス後</div>
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
          <table class="table">
            <thead>
              <tr>
                <th>Asset Class</th>
                <th>Target</th>
                <th>調整額</th>
                <th class="has-text-centered">金額
                  <br>（前）
                </th>
                <th class="has-text-centered">金額
                  <br>（後）
                </th>
                <th class="has-text-centered">比率
                  <br>（前）
                </th>
                <th class="has-text-centered">比率
                  <br>（後）
                </th>
                <th class="has-text-centered">乖離率
                  <br>（前）
                </th>
                <th class="has-text-centered">乖離率
                  <br>（後）
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res in result" :key="res.key">
                <td>{{res.name}}</td>
                <td class="has-text-centered">{{res.targetRate}}%</td>
                <td class="has-text-right">{{getCommaNumber(res.dstAdjust)}}</td>
                <td class="has-text-right">{{getCommaNumber(res.srcAmount)}}</td>
                <td class="has-text-right">{{getCommaNumber(res.dstAmount)}}</td>
                <td class="has-text-right">{{getFormatedPercentage(res.srcCurrentRate)}}%</td>
                <td class="has-text-right">{{getFormatedPercentage(res.dstCurrentRate)}}%</td>
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
  </section>
</template>

<script>
import Spinner from '~/components/Spinner';
import Divider from '~/components/Divider';
import firebase from '~/assets/js/firebase';
import MyChart from '~/components/MyChart';
import { getCommaNumber, getFormatedPercentage } from '~/utils';

const db = firebase.firestore();

export default {
  components: {
    Spinner,
    Divider,
    MyChart,
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
</style>

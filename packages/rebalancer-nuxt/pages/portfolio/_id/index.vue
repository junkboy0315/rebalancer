<template>
  <section class="portfolio">
    <div class="top-line">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/portfolio">Portfolio</nuxt-link>
          </li>
          <li class="is-active">
            <a href="#">{{portfolio && portfolio.name}}</a>
          </li>
        </ul>
      </nav>
      <nuxt-link
        :to="this.$route.params.id + '/rebalance'"
        :disabled="hasErrors"
        class="button is-primary"
      >リバランスを実行する</nuxt-link>
    </div>
    <!-- errors -->
    <div v-if="errors.length > 0" class="notification is-warning">
      <ul>
        <li v-for="error in errors" :key="error">- {{error}}</li>
      </ul>
    </div>
    <!-- portfolio summary -->
    <h2>ポートフォリオ概要</h2>
    <div class="card">
      <div class="card-content">
        <div class="level">
          <div class="level-left">
            <div>名称：</div>
            <input
              @change="onPortfolioTitleChange($event.target.value)"
              :class="{'is-static': !isEditModeOfPortfolioTitle}"
              class="input"
              :style="{width:'20rem'}"
              :value="portfolio && portfolio.name"
            >
          </div>
        </div>
        <div>評価額：{{total}}円</div>
        <button @click="onPortfolioDelete(portfolio.id)" class="button is-danger">ポートフォリオを削除</button>
      </div>
    </div>
    <!-- asset classes -->
    <h2>アセットクラス</h2>
    <template v-if="portfolio">
      <AssetClassCard
        v-for="assetClass in portfolio.assetClasses"
        :key="assetClass.id"
        :assetClass="assetClass"
        :onAssetClassDelete="deleteAssetClass"
        :onTargetRateChange="changeTargetRate"
        :onAddAsset="addAsset"
        :onAssetDelete="deleteAsset"
        :onAssetClassNameChange="onAssetClassNameChange"
        :onAssetNameChange="onAssetNameChange"
        :onAssetAmountChange="onAssetAmountChange"
        class="asset-class-card"
      />
    </template>
    <AssetClassCardNew @click="addAssetClass"/>
  </section>
</template>

<script>
import uuid from 'uuid/v4';
import AssetClassCard from '~/components/AssetClassCard';
import AssetClassCardNew from '~/components/AssetClassCardNew';
import firebase from '~/assets/js/firebase';
import { getCommaNumber } from '~/utils';

const db = firebase.firestore();

export default {
  components: {
    AssetClassCard,
    AssetClassCardNew,
  },
  computed: {
    portfolio() {
      return this.$store.getters.portfolioById(this.$route.params.id);
    },
    total() {
      if (!this.portfolio) return 0;
      const totalsOfEachAssetClass = this.portfolio.assetClasses.map(_ =>
        _.assets.reduce((acc, next) => acc + next.amount, 0)
      );
      const total = totalsOfEachAssetClass.reduce((acc, next) => acc + next, 0);
      return getCommaNumber(total);
    },
    numberOfAssetClass() {
      return this.portfolio.assetClasses.length;
    },
    hasErrors() {
      return this.errors.length > 0;
    },
    errors() {
      const errors = [];
      if (this.portfolio) {
        const totalTargetRate = this.portfolio.assetClasses.reduce(
          (acc, next) => acc + next.targetRate,
          0
        );
        const hasMinusTargetRate = this.portfolio.assetClasses.find(
          _ => _.targetRate < 0
        );
        if (totalTargetRate !== 100)
          errors.push('目標割合の合計が100%になるように調整してください。');
        if (hasMinusTargetRate)
          errors.push('目標割合をマイナスに設定することはできません');
      }
      return errors;
    },
  },
  methods: {
    async addAssetClass() {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: [
            ...this.portfolio.assetClasses,
            { id: uuid(), name: 'domestic!', assets: [], targetRate: 0 },
          ],
        });
    },
    async deleteAssetClass(id) {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.filter(_ => _.id !== id),
        });
    },
    async changeTargetRate(id, e) {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.map(_ => {
            if (_.id !== id) return _;

            return {
              ..._,
              targetRate: Math.floor(Number(e.target.value)),
            };
          }),
        });
    },
    async addAsset(id) {
      const newAsset = {
        id: uuid(),
        name: 'new asset',
        amount: 0,
      };
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.map(_ => {
            if (_.id !== id) return _;

            return {
              ..._,
              assets: [..._.assets, newAsset],
            };
          }),
        });
    },
    async deleteAsset(assetClassId, assetId) {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.map(_ => {
            if (_.id !== assetClassId) return _;
            return {
              ..._,
              assets: _.assets.filter(asset => asset.id !== assetId),
            };
          }),
        });
    },
    async onAssetClassNameChange(assetClassId, event) {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.map(_ => {
            if (_.id !== assetClassId) return _;
            return {
              ..._,
              name: event.target.value,
            };
          }),
        });
    },
    async onAssetNameChange(assetClassId, assetId, event) {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.map(_ => {
            if (_.id !== assetClassId) return _;
            return {
              ..._,
              assets: _.assets.map(asset => {
                if (asset.id !== assetId) return asset;
                return {
                  ...asset,
                  name: event.target.value,
                };
              }),
            };
          }),
        });
    },
    async onAssetAmountChange(assetClassId, assetId, event) {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.map(_ => {
            if (_.id !== assetClassId) return _;
            return {
              ..._,
              assets: _.assets.map(asset => {
                if (asset.id !== assetId) return asset;
                return {
                  ...asset,
                  amount: Math.floor(Number(event.target.value)),
                };
              }),
            };
          }),
        });
    },
    async onPortfolioDelete(portfolioId) {
      await db
        .collection('portfolios')
        .doc(portfolioId)
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
  data() {
    return {
      isEditModeOfPortfolioTitle: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.portfolio {
  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }

  .top-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>

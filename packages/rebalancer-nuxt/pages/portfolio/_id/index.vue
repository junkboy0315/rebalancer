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
    <div v-if="errors.length > 0" class="notification is-warning">
      <ul>
        <li v-for="error in errors" :key="error">- {{error}}</li>
      </ul>
    </div>
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
  },
};
</script>

<style lang="scss" scoped>
.portfolio {
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

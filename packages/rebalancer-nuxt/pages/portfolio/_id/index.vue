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
    </div>
    <div v-if="$route.query['sample-portfolio'] === 'true'" class="notification is-warning">
      This is the sample portfolio for quickstart.
      Edit this as you like and press the 'Rebalance' button at the bottom !
    </div>
    <!-- portfolio summary -->
    <h2>Portfolio Summary</h2>
    <PortfolioSummary :portfolio="portfolio"/>
    <!-- asset classes -->
    <h2>Asset Classes</h2>
    <transition-group tag="div" class="asset-classes-container">
      <AssetClassCard
        v-for="assetClass in sortedAssetClasses"
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
    </transition-group>
    <AssetClassCardNew @click="addAssetClass"/>
    <!-- errors -->
    <div v-if="errors.length > 0 && sortedAssetClasses.length > 0" class="notification is-warning">
      <ul>
        <li v-for="error in errors" :key="error">- {{error}}</li>
      </ul>
    </div>
    <!-- rebalance button -->
    <button
      :disabled="hasErrors"
      @click="onRebalance"
      class="button is-primary is-fullwidth"
    >Rebalance</button>
  </section>
</template>

<script>
import uuid from 'uuid/v4';
import AssetClassCard from '~/components/AssetClassCard';
import AssetClassCardNew from '~/components/AssetClassCardNew';
import PortfolioSummary from '~/components/PortfolioSummary';
import firebase from '~/assets/js/firebase';
import { getCommaNumber } from '~/utils';

const db = firebase.firestore();

export default {
  components: {
    AssetClassCard,
    AssetClassCardNew,
    PortfolioSummary,
  },
  computed: {
    portfolio() {
      return this.$store.getters.portfolioById(this.$route.params.id);
    },
    sortedAssetClasses() {
      if (!this.portfolio) return [];
      return this.portfolio.assetClasses.sort((a, b) => a.name > b.name);
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
        const hasExcessiveTargetRate = this.portfolio.assetClasses.find(
          _ => _.targetRate > 100
        );
        if (totalTargetRate !== 100)
          errors.push('The total target rate should be 100%.');
        if (hasMinusTargetRate)
          errors.push('Each target rate must be a positive value.');
        if (hasExcessiveTargetRate)
          errors.push('Each target rate can not exceed 100%.');
      }
      return errors;
    },
  },
  methods: {
    onRebalance() {
      this.$router.push(this.$route.params.id + '/rebalance');
    },
    async addAssetClass() {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: [
            ...this.portfolio.assetClasses,
            {
              id: uuid(),
              name: 'My New Asset Class',
              assets: [],
              targetRate: 0,
            },
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
    async changeTargetRate(id, rate) {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.map(_ => {
            if (_.id !== id) return _;

            return {
              ..._,
              targetRate: Math.floor(Number(rate)),
            };
          }),
        });
    },
    async addAsset(id) {
      const newAsset = {
        id: uuid(),
        name: 'My New Asset',
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
    async onAssetClassNameChange(assetClassId, name) {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: this.portfolio.assetClasses.map(_ => {
            if (_.id !== assetClassId) return _;
            return {
              ..._,
              name,
            };
          }),
        });
    },
    async onAssetNameChange(assetClassId, assetId, name) {
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
                  name,
                };
              }),
            };
          }),
        });
    },
    async onAssetAmountChange(assetClassId, assetId, amount) {
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
                  amount: Math.floor(Number(amount)),
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

  .asset-classes-container {
    .v-enter {
      opacity: 0;
      transform: translateX(-30px);
    }
    .v-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
    .v-enter-active,
    .v-leave-active {
      transition: all 0.2s;
    }
  }
}
</style>

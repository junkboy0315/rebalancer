<template>
  <section class="portfolio">
    <div class="top-line">
      <h1>Portfolio > Portfolio1</h1>
      <nuxt-link :to="this.$route.params.id + '/rebalance'" class="button is-primary">リバランスを実行する</nuxt-link>
    </div>
    <AssetClassCard
      v-for="assetClass in portfolio.assetClasses"
      :key="assetClass.id"
      :assetClass="assetClass"
      :onAssetClassDelete="deleteAssetClass"
      :onTargetRateChange="changeTargetRate"
      :onAddAsset="addAsset"
      :onAssetDelete="deleteAsset"
      :onAssetAmountChange="onAssetAmountChange"
      class="asset-class-card"
    />
    <AssetClassCardNew @click.native="addAssetClass"/>
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
  mounted() {
    firebase.auth().onAuthStateChanged(async user => {
      db.doc(`portfolios/${this.$route.params.id}`).onSnapshot(
        doc => (this.portfolio = doc.data())
      );
    });
  },
  data() {
    return {
      portfolio: {},
    };
  },
  methods: {
    async addAssetClass() {
      await db
        .collection('portfolios')
        .doc(this.$route.params.id)
        .update({
          assetClasses: [
            ...this.portfolio.assetClasses,
            { id: uuid(), name: 'domestic!', assets: [] },
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
      console.log(id);
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
  }

  .asset-class-card {
    margin-bottom: 28px;
  }
}
</style>

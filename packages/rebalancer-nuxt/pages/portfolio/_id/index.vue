<template>
  <section class="portfolio">
    {{ portfolio }}
    <div class="top-line">
      <h1>Portfolio > Portfolio1</h1>
      <nuxt-link :to="this.$route.params.id + '/rebalance'" class="button is-primary">リバランスを実行する</nuxt-link>
    </div>
    <AssetClassCard
      v-for="assetClass in portfolio.assetClasses"
      :key="assetClass.id"
      :assetClass="assetClass"
      :onAssetClassDelete="deleteAssetClass"
      class="asset-class-card"
    />
    <AssetClassCardNew @click.native="addAssetClass"/>
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
            { id: uuid(), name: 'domestic!' },
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

<template>
  <div>
    <Spinner background="#d84f00" class="spinner"/>wait a sec...
  </div>
</template>

<script>
import firebase from '~/assets/js/firebase';
import uuid from 'uuid/v4';
import Spinner from '~/components/Spinner';

const db = firebase.firestore();

export default {
  components: { Spinner },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user.isAnonymous) return this.$router.replace('/portfolio');
      this.createSamplePortfolio();
    });
  },
  methods: {
    async createSamplePortfolio() {
      const uid = firebase.auth().currentUser.uid;
      const { id } = await db.collection('portfolios').add({
        owner: uid,
        name: 'Sample Portfolio 1',
        assetClasses: [
          {
            id: uuid(),
            name: '01 Domestic Asset Class',
            assets: [
              {
                id: uuid(),
                name: 'Vanguard VOO',
                amount: 1000,
              },
              {
                id: uuid(),
                name: 'iShares Core S&P 500',
                amount: 5000,
              },
            ],
            targetRate: 50,
          },
          {
            id: uuid(),
            name: '02 Global Asset Class',
            assets: [
              {
                id: uuid(),
                name: 'iShares MSCI EAFE',
                amount: 3000,
              },
              {
                id: uuid(),
                name: 'Vanguard VT',
                amount: 1000,
              },
            ],
            targetRate: 30,
          },
          {
            id: uuid(),
            name: '03 Emerging Asset Class',
            assets: [
              {
                id: uuid(),
                name: 'iShares MSCI Emerging',
                amount: 1500,
              },
            ],
            targetRate: 20,
          },
        ],
      });
      this.$router.replace(`/portfolio/${id}?sample-portfolio=true`);
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  margin-right: 1rem;
}
</style>

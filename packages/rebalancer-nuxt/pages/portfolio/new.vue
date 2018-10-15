<template>
  <div>
    <h1>Portfolio</h1>
    <div class="card">
      <div class="liner">
        <div class="my-title has-text-weight-bold">新しいポートフォリオの名前</div>
        <input class="input" v-model="portfolioName" type="text" placeholder="Text input">
      </div>
      <div class="liner">
        <button @click="createPortfolio" class="button is-primary">作成する</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/assets/js/firebase';
const db = firebase.firestore();

export default {
  components: {},
  data() {
    return {
      portfolioName: '',
    };
  },
  methods: {
    async createPortfolio() {
      const uid = firebase.auth().currentUser.uid;
      await db.collection('portfolios').add({
        owner: uid,
        name: this.portfolioName,
        assetClasses: [],
      });
      this.$router.push('/portfolio');
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 42px;

  .liner {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

    &:last-of-type {
      margin-bottom: 0;
    }

    .my-title {
      margin-right: 1rem;
    }

    @media (max-width: 768px) {
      display: block;
    }
  }

  .input {
    width: 15rem;
    vertical-align: baseline;
  }
}
</style>

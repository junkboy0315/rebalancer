<template>
  <div class="card" v-if="portfolio">
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <div>名称：</div>
          <div v-if="!isTitleEditMode" @click="isTitleEditMode = true">{{portfolio.name}}</div>
          <input
            v-if="isTitleEditMode"
            @blur="isTitleEditMode = false"
            @change="onPortfolioTitleChange($event.target.value)"
            :style="{width:'20rem'}"
            :value="portfolio.name"
            class="input"
          >
        </div>
      </div>
      <div class="level">
        <div class="level-left">
          <div>評価額：</div>
          <div>{{total}}円</div>
        </div>
        <div class="level-right">
          <a @click="onPortfolioDelete(portfolio.id)" class="is-danger">削除</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCommaNumber } from '~/utils';
import firebase from '~/assets/js/firebase';

const db = firebase.firestore();

export default {
  props: { portfolio: { type: Object } },
  data() {
    return {
      isTitleEditMode: false,
    };
  },
  computed: {
    total() {
      if (!this.portfolio) return 0;
      const subTotal = this.portfolio.assetClasses.map(_ =>
        _.assets.reduce((acc, next) => acc + next.amount, 0)
      );
      const total = subTotal.reduce((acc, next) => acc + next, 0);
      return getCommaNumber(total);
    },
  },
  methods: {
    async onPortfolioDelete(portfolioId) {
      if (!window.confirm('このポートフォリオを削除してよろしいですか？'))
        return;
      await db
        .collection('portfolios')
        .doc(this.portfolio.id)
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
};
</script>

<style lang="scss" scoped>
.level {
  margin-bottom: 0;
}
.card {
  margin-bottom: 2rem;
}
</style>

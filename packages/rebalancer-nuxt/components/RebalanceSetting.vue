<template>
  <div class="card">
    <div class="liner">
      <div class="has-text-weight-bold">追加投資額（売却額）</div>
      <input v-model="adjust" class="input" type="number" placeholder="">
    </div>
    <div class="liner">
      <div class="has-text-weight-bold">リバランスの種別</div>
      <div class="">
        <label class="radio">
          <input type="radio" id="sell" value="sell" v-model="rebalanceType">
          <span>セルリバランス</span>
        </label>
        <br>
        <label class="radio">
          <input type="radio" id="nosell" value="nosell" v-model="rebalanceType">
          <span>ノーセルリバランス</span>
        </label>
      </div>
    </div>
    <div class="liner">
      <nuxt-link
        :to="`/portfolio/${this.$route.params.id}/result?rebalanceType=${this.rebalanceType}&adjust=${this.adjust}`"
        class="button is-primary"
      >リバランスを実行する</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      adjust: '',
      rebalanceType: '',
    };
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

    & > *:first-child {
      width: 12rem;
    }

    @media (max-width: 768px) {
      display: block;
    }
  }

  .input {
    width: 10rem;
    vertical-align: baseline;
  }
}
</style>

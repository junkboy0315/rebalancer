<template>
  <section class="portfolio">
    <h1>Portfolio > Portfolio1 > Rebalance</h1>
    <div class="card">
      <div class="liner">
        <div class="has-text-weight-bold">追加投資額（売却額）</div>
        <input v-model="adjust" class="input" type="number" placeholder="">
      </div>
      <div class="liner">
        <div class="has-text-weight-bold">リバランスの種別</div>
        <div>
          <label class="radio">
            <input type="radio" id="nosell" value="nosell" v-model="rebalanceType">
            <span>ノーセルリバランス</span>
          </label>
          <br>
          <label class="radio">
            <input type="radio" id="sell" value="sell" v-model="rebalanceType">
            <span>セルリバランス</span>
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      adjust: 0,
      rebalanceType: 'nosell',
    };
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
      text-align: center;
    }
  }
}
</style>

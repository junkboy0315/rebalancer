<template>
  <div>
    <h1>Portfolio</h1>

    <div class="card">

      <div class="liner">
        <div class="my-title has-text-weight-bold">新しいポートフォリオの名前</div>
        <input class="input" type="text" placeholder="Text input" />
    </div>

        <div class="liner">
          <nuxt-link to="?mode=rebalance-result" class="button is-primary">作成する</nuxt-link>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
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

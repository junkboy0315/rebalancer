<template>
  <div>
    <div v-if="!isRebalanceNeeded">リバランスできません。</div>
    <div v-for="assetClass in result" :key="assetClass.id">
      <div v-if="assetClass.dstAdjust !== 0">
        アセットクラス「
        <span
          :class="isBuy(assetClass.dstAdjust) ? 'buy' : 'sell'"
          class="asset-class-name"
        >{{assetClass.name}}</span>
        」において、
        <span
          :class="isBuy(assetClass.dstAdjust) ? 'buy' : 'sell'"
          class="adjust-amount"
        >{{ getCommaNumber(Math.abs(assetClass.dstAdjust)) }}円の{{ isBuy(assetClass.dstAdjust) ? '購入':'売却'}}</span>を行ってください
      </div>
    </div>
  </div>
</template>

<script>
import { getCommaNumber } from '~/utils';

export default {
  props: { result: { type: Array } },
  computed: {
    isRebalanceNeeded() {
      return this.result.some(_ => _.dstAdjust !== 0);
    },
  },
  methods: {
    getCommaNumber(_) {
      return getCommaNumber(_);
    },
    isBuy(_) {
      return _ > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.buy {
  color: green;
}
.sell {
  color: red;
}
.asset-class-name {
  font-weight: bold;
}

.adjust-amount {
  font-weight: bold;
}
</style>

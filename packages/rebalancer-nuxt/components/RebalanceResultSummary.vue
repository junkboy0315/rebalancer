<template>
  <div>
    <div v-if="!isRebalanceNeeded">There is no need to rebalance.</div>
    <ul>
      <li v-for="assetClass in result" :key="assetClass.id" v-if="assetClass.dstAdjust !== 0">
        <span
          :class="isBuy(assetClass.dstAdjust) ? 'buy' : 'sell'"
          class="adjust-amount"
        >{{ isBuy(assetClass.dstAdjust) ? 'Buy':'Sell'}} {{ getCommaNumber(Math.abs(assetClass.dstAdjust)) }}</span>
        on asset class
        <span
          :class="isBuy(assetClass.dstAdjust) ? 'buy' : 'sell'"
          class="asset-class-name"
        >{{assetClass.name}}</span>
      </li>
    </ul>
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
ul {
  padding-left: 1.5rem;
}
li {
  list-style-type: disc;
}
</style>

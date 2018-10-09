<template>
  <div class="my-container">
    {{ asset.name }}
    <input
      :value="asset.amount"
      @change="onAmountChange(asset.id, $event)"
      class="input"
      type="number"
      placeholder="Text input"
    >円
    <div @click="onDelete(asset.id)">削除</div>
  </div>
</template>

<script>
export default {
  props: {
    asset: {
      type: Object,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
    onAmountChange: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  padding: 12px;
  padding-left: 3rem;
}
input {
  width: 10rem;
  vertical-align: baseline;
}
</style>

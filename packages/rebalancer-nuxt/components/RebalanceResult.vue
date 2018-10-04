<template>
  <div class="card">
    <div class="my-container">
      <div class="has-text-weight-bold">リバランスの概要</div>
      <div>今回の投資額: 145,358円</div>
      <div>リバランス方針: ノーセルリバランス</div>
    </div>
    <Divider/>
    <div class="my-container">
      <div class="has-text-weight-bold">試算結果</div>
      <div>国内株式クラス: 243,423円の購入を行ってください</div>
      <div>外国株式クラス: 243,423円の売却を行ってください</div>
    </div>
    <Divider/>
    <div class="my-container">
      <div class="has-text-weight-bold">リバランス前後のポートフォリオ</div>
      <div>リバランス前</div>
      <div>リバランス後</div>
    </div>
  </div>
</template>

<script>
import Divider from './Divider';

export default {
  components: { Divider },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  padding: 32px;
}
</style>

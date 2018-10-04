<template>
  <div class="card">

    <!-- top line -->
    <div class="level first-line">

      <div class="level-item asset-class-name">
        <div class="icon"><i class="fas fa-caret-square-right"></i></div>
        <div class="asset-class-title">国内株式クラス</div>
      </div>

      <div class="level-item target-rate">
        <label>目標割合:</label>
        <input class="input" type="text" placeholder="Text input" />%
      </div>

        <div class="level-item current-total">
          <label>現在の評価額:</label>
          123,344円
        </div>

        <div class="level-item current-deviation">
          <label>目標との乖離:</label>
          123,344円
        </div>

      </div>

      <Divider color="#525252" />

      <AssetLiner assetName="eMAXIS TOPIX インデックス" />
      <Divider color="#ebeef5" />

      <AssetLiner assetName="1475 iシェアーズ TOPIX ETF" />
      <Divider color="#ebeef5" />

      <AssetLinerNew />

    </div>
</template>

<script>
import Divider from './Divider';
import AssetLiner from './AssetLiner';
import AssetLinerNew from './AssetLinerNew';

export default {
  components: {
    Divider,
    AssetLiner,
    AssetLinerNew,
  },
};
</script>

<style lang="scss" scoped>
.card {
  .first-line {
    padding: 24px;
    margin-bottom: 0;

    .asset-class-name {
      justify-content: left;

      .icon {
        color: #d84f00;
        font-size: 2rem;
        margin-right: 1rem;
      }

      .asset-class-title {
        font-weight: bold;
      }
    }

    .target-rate input {
      width: 3rem;
    }
  }
}
</style>

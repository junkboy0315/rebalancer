<template>
  <div class="card">
    <!-- top line -->
    <div class="level first-line">
      <div class="level-item asset-class-name">
        <div class="icon">
          <i class="fas fa-caret-square-right"></i>
        </div>
        <div
          class="asset-class-title"
          @click="onAssetClassDelete(assetClass.id)"
        >{{ assetClass.name }}</div>
      </div>
      <div class="level-item target-rate">
        <label>目標割合:</label>
        <input
          @change="onTargetRateChange(assetClass.id, $event)"
          class="input"
          type="number"
          :value="assetClass.targetRate"
          placeholder="Text input"
        >%
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
    <Divider color="#525252"/>
    <template v-for="asset in assetClass.assets">
      <AssetLiner
        :asset="asset"
        :onDelete="(assetId)=>onAssetDelete(assetClass.id, assetId)"
        :onAmountChange="(assetId, event)=>onAssetAmountChange(assetClass.id, assetId, event)"
        :key="asset.id+'-liner'"
      />
      <Divider color="#ebeef5" :key="asset.id+'divider'"/>
    </template>
    <AssetLinerNew @click.native="onAddAsset(assetClass.id)"/>
  </div>
</template>

<script>
import Divider from './Divider';
import AssetLiner from './AssetLiner';
import AssetLinerNew from './AssetLinerNew';
import firebase from '~/assets/js/firebase';

const db = firebase.firestore();

export default {
  props: {
    assetClass: {
      type: Object,
      required: true,
    },
    onAssetClassDelete: {
      type: Function,
      required: true,
    },
    onTargetRateChange: {
      type: Function,
      required: true,
    },
    onAddAsset: {
      type: Function,
      required: true,
    },
    onAssetDelete: {
      type: Function,
      required: true,
    },
    onAssetAmountChange: {
      type: Function,
      required: true,
    },
  },
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
      width: 5rem;
      text-align: center;
    }
  }
}
</style>

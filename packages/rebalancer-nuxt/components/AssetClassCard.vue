<template>
  <div class="card">
    <!-- top line -->
    <div class="level first-line">
      <div class="level-left">
        <div class="level-item asset-class-name">
          <div class="icon">
            <i class="fas fa-caret-square-right"></i>
          </div>
          <BaseInput
            :value="assetClass.name"
            @change="onAssetClassNameChange(assetClass.id, $event)"
            :textStyle="{fontWeight: 'bold'}"
          />
        </div>
        <div class="level-item target-rate">
          <label>目標割合:</label>
          <BaseInput
            :value="assetClass.targetRate"
            type="number"
            @change="onTargetRateChange(assetClass.id, $event)"
            :inputStyle="{width: '5rem'}"
          />％
        </div>
        <div class="level-item current-total">
          <label>評価額:</label>
          {{ totalAmount }}円
        </div>
      </div>
      <div class="level-right">
        <div class="icon" @click="_onAssetClassDelete(assetClass.id)">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    </div>
    <Divider color="#525252"/>
    <transition-group class="assets-container">
      <template v-for="asset in sortedAssets">
        <AssetLiner
          :asset="asset"
          :onDelete="(assetId)=>onAssetDelete(assetClass.id, assetId)"
          :onNameChange="(assetId, event)=>onAssetNameChange(assetClass.id, assetId, event)"
          :onAmountChange="(assetId, event)=>onAssetAmountChange(assetClass.id, assetId, event)"
          :key="asset.id+'-liner'"
        />
        <Divider color="#ebeef5" :key="asset.id+'divider'"/>
      </template>
    </transition-group>
    <AssetLinerNew @click="onAddAsset(assetClass.id)"/>
  </div>
</template>

<script>
import Divider from './Divider';
import AssetLiner from './AssetLiner';
import AssetLinerNew from './AssetLinerNew';
import firebase from '~/assets/js/firebase';
import { getCommaNumber } from '~/utils';
import BaseInput from '~/components/base/BaseInput';

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
    onAssetClassNameChange: {
      type: Function,
      required: true,
    },
    onAssetNameChange: {
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
    BaseInput,
  },
  computed: {
    totalAmount() {
      const amount = this.assetClass.assets.reduce(
        (acc, next) => acc + next.amount,
        0
      );
      return getCommaNumber(amount);
    },
    sortedAssets() {
      return this.assetClass.assets.sort((a, b) => a.name > b.name);
    },
  },
  methods: {
    _onAssetClassDelete(assetClassId) {
      if (window.confirm('このアセットクラスを削除してよろしいですか？'))
        this.onAssetClassDelete(assetClassId);
    },
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

    .level-right .icon {
      color: #ebeef5;
      :hover {
        color: #525252;
      }
    }
  }

  .assets-container {
    .v-enter {
      opacity: 0;
      transform: translateX(-30px);
    }
    .v-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
    .v-enter-active,
    .v-leave-active {
      transition: all 0.2s;
    }
  }
}
</style>

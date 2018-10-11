<template>
  <div class="card">
    <!-- top line -->
    <div class="level first-line">
      <div class="level-item asset-class-name">
        <div class="icon">
          <i class="fas fa-caret-square-right"></i>
        </div>
        <input
          :value="assetClass.name"
          class="input"
          :class="{'is-static': !isTitleEditMode}"
          :style="{'text-decoration': isTitleEditMode ? 'none':'underline' }"
          ref="titleInput"
          @click="isTitleEditMode = true"
          @change="_onAssetClassNameChange($event)"
          @blur="isTitleEditMode = false"
        >
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
        <label>評価額:</label>
        {{ totalAmount }}円
      </div>
      <div class="level-item icon" @click="onAssetClassDelete(assetClass.id)">
        <i class="fas fa-trash"></i>
      </div>
    </div>
    <Divider color="#525252"/>
    <template v-for="asset in assetClass.assets">
      <AssetLiner
        :asset="asset"
        :onDelete="(assetId)=>onAssetDelete(assetClass.id, assetId)"
        :onNameChange="(assetId, event)=>onAssetNameChange(assetClass.id, assetId, event)"
        :onAmountChange="(assetId, event)=>onAssetAmountChange(assetClass.id, assetId, event)"
        :key="asset.id+'-liner'"
      />
      <Divider color="#ebeef5" :key="asset.id+'divider'"/>
    </template>
    <AssetLinerNew @click="onAddAsset(assetClass.id)"/>
  </div>
</template>

<script>
import Divider from './Divider';
import AssetLiner from './AssetLiner';
import AssetLinerNew from './AssetLinerNew';
import firebase from '~/assets/js/firebase';
import { getCommaNumber } from '~/utils';

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
  },
  data() {
    return {
      isTitleEditMode: false,
    };
  },
  computed: {
    totalAmount() {
      const amount = this.assetClass.assets.reduce(
        (acc, next) => acc + next.amount,
        0
      );
      return getCommaNumber(amount);
    },
  },
  methods: {
    _onAssetClassNameChange() {
      const that = this;
      this.isTitleEditMode = false;
      this.$refs.titleInput.blur();
      this.onAssetClassNameChange(that.assetClass.id, event);
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
  }
}
</style>

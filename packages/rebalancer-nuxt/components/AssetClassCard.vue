<template>
  <div class="card">
    <!-- top line -->
    <div class="level card-content is-mobile first-line">
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
      </div>
      <div class="level-right">
        <div @click="_onAssetClassDelete(assetClass.id)" class="delete"></div>
      </div>
    </div>
    <Divider color="#EBEEF5"/>
    <div class="card-content">
      <div>
        <label>- Target Rate:</label>
        <BaseInput
          :value="assetClass.targetRate"
          type="number"
          @change="onTargetRateChange(assetClass.id, $event)"
          :inputStyle="{width: '5rem'}"
        />％
      </div>
      <div>
        <label>- Subtotal:</label>
        {{ totalAmount }}
      </div>
    </div>
    <Divider color="#EBEEF5"/>
    <div class="card-content table-container">
      <table class="table is-borderedd">
        <thead>
          <tr>
            <th>Asset</th>
            <th class="has-text-centered">Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asset in sortedAssets" :key="asset.id">
            <td>
              <BaseInput
                :value="asset.name"
                @change="onAssetNameChange(assetClass.id, asset.id, $event)"
              />
            </td>
            <td class="has-text-right">
              <BaseInput
                :value="asset.amount"
                @change="onAssetAmountChange(assetClass.id, asset.id, $event)"
                :inputStyle="{width: '10rem'}"
                type="number"
              />
            </td>
            <td>
              <div @click="_onAssetDelete(assetClass.id, asset.id)" class="delete"></div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <AddNewAsset @click="onAddAsset(assetClass.id)"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Divider from './Divider';
import AddNewAsset from './AddNewAsset';
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
    AddNewAsset,
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
      if (window.confirm('Are you sure to delete this asset class?'))
        this.onAssetClassDelete(assetClassId);
    },
    _onAssetDelete(assetClassId, assetId) {
      if (window.confirm('Are you sure to delete this asset?'))
        this.onAssetDelete(assetClassId, assetId);
    },
    getCommaNumber(_) {
      return getCommaNumber(_);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  .first-line {
    margin-bottom: 0;

    .asset-class-name {
      .icon {
        color: #d84f00;
        font-size: 2rem;
        margin-right: 1rem;
      }

      .asset-class-title {
        font-weight: bold;
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

.table-container {
  white-space: nowrap;
}

label {
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>

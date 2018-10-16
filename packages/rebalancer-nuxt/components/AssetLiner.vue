<template>
  <div class="level is-marginless">
    <div class="level-left">
      <div class="level-item">
        <BaseInput :value="asset.name" @change="onNameChange(asset.id, $event)"/>
      </div>
      <div class="level-item">
        <BaseInput
          :value="asset.amount"
          @change="onAmountChange(asset.id, $event)"
          :inputStyle="{width: '10rem'}"
          type="number"
        />円
      </div>
    </div>
    <div class="level-right">
      <a @click="_onDelete(asset.id)" class="level-item">
        <div class="icon">
          <i class="fas fa-trash"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import BaseInput from '~/components/base/BaseInput';

export default {
  components: {
    BaseInput,
  },
  props: {
    asset: {
      type: Object,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
    onNameChange: {
      type: Function,
      required: true,
    },
    onAmountChange: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isEditMode: false,
    };
  },
  methods: {
    _onDelete(assetId) {
      if (window.confirm('このアセットを削除してよろしいですか？'))
        this.onDelete(assetId);
    },
  },
};
</script>

<style lang="scss" scoped>
.level {
  padding: 2px 24px;
  min-height: 40px;
}
.asset-name {
}
.asset-amount {
  width: 10rem;
  text-align: center;
}
.icon {
  color: #ebeef5;
  :hover {
    color: #525252;
  }
}
</style>

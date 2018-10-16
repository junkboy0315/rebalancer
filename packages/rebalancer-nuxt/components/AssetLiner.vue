<template>
  <div class="level is-marginless">
    <div class="level-left">
      <div class="level-item">
        <input
          :value="asset.name"
          @click="isEditMode = true"
          @change="_onNameChange(asset.id, $event)"
          @blur="isEditMode = false"
          class="input level-item asset-name"
          :class="{'is-static': !isEditMode}"
          ref="assetNameInput"
          placeholder=""
        >
      </div>
      <div class="level-item">
        <input
          :value="asset.amount"
          @change="onAmountChange(asset.id, $event)"
          class="input level-item asset-amount"
          type="number"
          placeholder="Text input"
        >円
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
    _onNameChange(assetId, event) {
      this.isEditMode = false;
      this.$refs.assetNameInput.blur();
      this.onNameChange(assetId, event);
    },
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

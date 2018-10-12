<template>
  <div class="level is-marginless is-mobile">
    <div class="level-left">
      <div class="level-item">
        <input
          :value="asset.name"
          @click="isEditMode = true"
          @change="_onNameChange(asset.id, $event)"
          @blur="isEditMode = false"
          class="input level-item"
          :class="{'is-static': !isEditMode}"
          ref="assetNameInput"
          placeholder=""
        >
      </div>
      <div class="level-item">
        <input
          :value="asset.amount"
          @change="onAmountChange(asset.id, $event)"
          class="input level-item"
          type="number"
          placeholder="Text input"
        >円
      </div>
      <div class="level-right">
        <a @click="_onDelete(asset.id)" class="level-item">
          <div class="icon">
            <i class="fas fa-trash"></i>
          </div>
        </a>
      </div>
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
  padding: 12px;
  padding-left: 3rem;
}
input {
  width: 10rem;
  vertical-align: baseline;
  text-align: center;
}
</style>

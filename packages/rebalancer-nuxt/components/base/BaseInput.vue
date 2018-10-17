<template>
  <span>
    <template v-if="!isEditMode">
      <div
        @click="onEditStart"
        class="text-holder"
        :style="[{padding:'2px 8px'}, textStyle]"
      >{{value}}</div>
    </template>
    <input
      v-bind="$attrs"
      v-if="isEditMode"
      :value="value"
      @change="onChange($event.target.value)"
      @keyup.enter="onEditEnd"
      @keyup.esc="onEditEnd"
      @blur="onEditEnd"
      ref="myInput"
      class="input my-input"
      :style="inputStyle"
    >
  </span>
</template>

<script>
import Vue from 'vue';

export default {
  inheritAttrs: false,
  props: ['value', 'textStyle', 'inputStyle'],
  data() {
    return {
      isEditMode: false,
    };
  },
  methods: {
    onEditStart() {
      this.isEditMode = true;
      // wait until the input element is rendered
      Vue.nextTick(() => {
        this.$refs.myInput.focus();
      });
    },
    onEditEnd() {
      this.isEditMode = false;
    },
    onChange(text) {
      this.$emit('change', text);
    },
  },
};
</script>

<style lang="scss" scoped>
.text-holder {
  cursor: pointer;
  background: #f0f0f0;
  display: inline;
}
.my-input {
  text-align: center;
}
</style>

<template>
  <div :style="dividerStyle">
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#ebeef5',
    },
    width: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    dividerStyle() {
      return {
        width: '100%',
        height: `${this.width}px`,
        background: this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

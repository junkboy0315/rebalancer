<template>
  <div class="my-container">
    {{ assetName }}
    <input class="input" type="text" placeholder="Text input">円
  </div>
</template>

<script>
export default {
  props: ['assetName', 'amount'],
};
</script>

<style lang="scss" scoped>
.my-container {
  padding: 12px;
  padding-left: 3rem;
}
input {
  width: 10rem;
  vertical-align: baseline;
}
</style>

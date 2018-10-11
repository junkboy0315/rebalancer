<template>
  <div class="my-container">
    <div @click="$emit('click')" class="add-asset">
      <i class="fas fa-plus"></i>アセットを追加する
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.my-container {
  color: #d84f00;
  padding: 12px;
  padding-left: 3rem;
  min-height: 58px;
  align-items: center;
  display: flex;

  i {
    margin-right: 0.5rem;
  }

  .add-asset {
    cursor: pointer;
  }
}
</style>

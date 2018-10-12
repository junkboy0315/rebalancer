<template>
  <div class="card">
    <div class="my-container">
      <div @click="$emit('click')" class="add-assetclass">
        <i class="fas fa-plus"></i>アセットクラスを追加する
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 28px;
}
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

  .add-assetclass {
    cursor: pointer;
  }
}
</style>

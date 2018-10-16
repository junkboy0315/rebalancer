<template>
  <div class="card">
    <div class="card-content">
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
  background: transparent;
  box-shadow: none;
  border: 1px dotted #525252;
}
.card-content {
  color: #d84f00;
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

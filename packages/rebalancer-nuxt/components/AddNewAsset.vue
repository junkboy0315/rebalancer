<template>
  <div class="my-container">
    <div @click="$emit('click')" class="add-asset">
      <i class="fas fa-plus"></i>Add Asset
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.my-container {
  color: #d84f00;

  i {
    margin-right: 0.5rem;
  }

  .add-asset {
    cursor: pointer;
  }
}
</style>

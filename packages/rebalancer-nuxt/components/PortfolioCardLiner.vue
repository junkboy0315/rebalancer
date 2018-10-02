<template>
  <div class="liner">
    <div>{{title}}</div>
    <div>{{value}}</div>
  </div>
</template>

<script>
export default {
  props: ['title', 'value'],
};
</script>

<style lang="scss" scoped>
.liner {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 4.5px;
  margin: 8px 0 8px;
}
</style>

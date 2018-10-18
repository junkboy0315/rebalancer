<template>
  <div class="my-iframe-container">
    <iframe :src="src" class="my-iframe" frameborder="0" allowfullscreen="true"></iframe>
  </div>
</template>

<script>
export default {
  props: ['src'],
};
</script>

<style lang="scss" scoped>
.my-iframe-container {
  background: #f0f0f0;
  height: 0;
  margin: 8px 0;
  /*
   * - '75%' indicates the aspect rasio (3/4 = 75%).
   * - '29px' indicates a bottom bar of the google slides.
   * - note that percentage inside 'padding-(top|bottom)' is calculated based on
   *   its current width. this is a specification of 'calc' used inside
   *   the 'padding-(top|bottom)' property.
   *
   * see: https://nathan.gs/2018/01/07/responsive-slideshare-iframe/
   */
  padding-bottom: calc(56.25%);
  position: relative;
  width: 100%;
}

.my-iframe {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>

<template>
  <div class="banner-container">
    <div class="banner-bar"></div>

    <div class="banner-title">
      <span class="banner-title-text">
        <slot>Panel</slot>
      </span>
      <div class="banner-title-edge"></div>
    </div>

    <div class="overhang">
      <div class="overhang-visable"></div>
      <div class="overhang-cover"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

.banner-container {
  background-color: black;
  width: 100%;
  height: $banner-height;
  position: relative;
}
.banner-bar {
  background-color: $orange;
  width: 100%;
  height: 100%;
  border-top-left-radius: $banner-radius;
}
.overhang {
  position: absolute;
  bottom: 0;
  display: flex;
  height: $overhang-height;
  width: 100%;
}
.overhang-visable {
  background-color: $orange;
  width: $overhang-width;
}
.overhang-cover {
  flex: 1 0 auto;
  background-color: black;
  border-top-left-radius: 20px;
}

.banner-title {
  color: $cornflower-blue;
  background-color: black;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
}
.banner-title-edge {
  border-top-right-radius: $banner-radius;
  border-bottom-right-radius: $banner-radius;
  width: $banner-radius + $padding;
  background-color: $india-red;
}
.banner-title-text {
  background-color: black;
  text-transform: uppercase;
  font-size: $banner-height;
  padding-right: $padding;
  padding-left: $padding;
  height: $banner-height - $overhang-height;

  // wierd hacks becuase of the font family to get it centered
  margin-top: -$padding;
  margin-bottom: $padding;
  //
}
</style>

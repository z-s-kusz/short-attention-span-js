<template>
<main class="panel-screen">
  <div class="banner-container">
    <div class="banner-bar"></div>

    <div class="banner-title">
      <span class="banner-title-text">MISSION OPS</span>
      <div class="banner-title-edge"></div>
    </div>

    <div class="overhang">
      <div class="overhang-visable"></div>
      <div class="overhang-cover"></div>
    </div>
  </div>


</main>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'tng-panel-font';
  src: url('../assets/star-trek-panel-font.ttf');
}

$orange: rgb(232,141,52);
$india-red: rgb(194,112,114);
$plum: rgb(199,158,200);
$portage: rgb(146,155,212);
$lavender: rgb(237,237,254); // white
$light-blue: rgb(163,205,245);
$cornflower-blue: rgb(80,157,235);
$steel-blue: rgb(65,106,187);
$padding: 20px;
.panel-screen {
  font-family: 'tng-panel-font', monospace;
  background-color: black;
  padding: $padding;
}

$banner-height: 120px;
$overhang-height: $padding;
$overhang-width: 120px;
$banner-radius: 50px;
.banner-container {
  // background: linear-gradient(135deg, black 10%, $orange 10%);
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

<template>
  <div class="banner" :class="colorClass">
    <div class="overhang-cover"></div>

    <div class="banner-title">
      <span class="banner-title-text" :class="textColorClass">
        <slot></slot>
      </span>
      <div class="banner-title-edge"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const colorOptions: readonly string[] = [
  'orange', 'red', 'plum', 'portage', 'light-blue', 'cornflower-blue', 'steel-blue', 'white',
];
export default Vue.extend({
  props: {
    color: {
      type: String,
      default: 'orange',
      validator(value) {
        if (!colorOptions.includes(value)) {
          console.error(`color must be one of the following: ${colorOptions}`);
          return false;
        }
        return true;
      },
    },
    textColor: {
      type: String,
      default: 'cornflower-blue',
      validator(value) {
        if (!colorOptions.includes(value)) {
          console.error(`textColor must be one of the following: ${colorOptions}`);
          return false;
        }
        return true;
      },
    },
  },
  computed: {
    colorClass(): string {
      return `tng-${this.color}`;
    },
    textColorClass(): string {
      return `tng-text-${this.textColor}`;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

.banner {
  background-color: $orange;
  width: 100%;
  height: 100%;
  position: relative;
  border-top-left-radius: $banner-radius;
}
.overhang-cover {
  position: absolute;
  bottom: 0;
  right: 0;
  left: $overhang-width;
  height: $padding;
  border-top-left-radius: $padding;
  background-color: black;
}

.banner-title {
  color: $cornflower-blue;
  background-color: black;
  position: absolute;
  top: 0;
  bottom: $padding;
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

@media only screen and (max-width: 899px) {
  .banner-title-edge {
    border-top-right-radius: $banner-radius-sm;
    border-bottom-right-radius: $banner-radius-sm;
    width: $banner-radius-sm;
  }
  .banner-title-text {
    height: $banner-height-sm - $overhang-height;
    font-size: $banner-height-sm - ($padding / 2);

    // wierd hacks becuase of the font family to get it centered
    margin-top: -$padding / 2;
    margin-bottom: $padding / 2;
    //
  }
}
</style>

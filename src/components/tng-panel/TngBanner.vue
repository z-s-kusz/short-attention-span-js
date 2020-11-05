<template>
  <div class="tng-component-root banner" :class="colorClass">
    <div class="overhang-cover"></div>

    <div class="banner-title">
      <div class="banner-title-text" :class="textColorClass">
        <slot></slot>
      </div>
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
  border-top-left-radius: var(--banner-radius);
}
.overhang-cover {
  position: absolute;
  bottom: 0;
  right: 0;
  left: var(--overhang-width);
  height: $padding;
  border-top-left-radius: $padding;
  background-color: black;
}

.banner-title {
  color: $cornflower-blue;
  background-color: black;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  top: 0;
  bottom: $padding;
  right: 0;
}
.banner-title-edge {
  display: inline-block;
  border-top-right-radius: var(--banner-radius);
  border-bottom-right-radius: var(--banner-radius);
  height: 100%;
  width: calc( var(--banner-radius) + #{$padding});
  background-color: $india-red;
}
.banner-title-text {
  display: inline-block;
  background-color: black;
  text-transform: uppercase;
  padding-right: $padding;
  padding-left: $padding;
  // unsure why these magic font-size and line-height numbers
  // are necessary to work in chrome for windows
  font-size: 135px;
  line-height: 75%;
}

@media only screen and (max-width: 899px) {
  .banner-title-text {
    font-size: 60px;
    line-height: 100%;
  }
}
</style>

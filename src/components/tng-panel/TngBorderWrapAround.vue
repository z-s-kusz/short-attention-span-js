<template>
  <div class="border-container">
    <div class="border" :class="colorClass"></div>

    <div class="tail-accent"></div>

    <div class="accent-x-cut" v-if="accentX">
      <div class="cut-cover" :class="colorClass"></div>
    </div>

    <div class="accent-y-container" v-if="accentY !== 'none'">
      <div :class="accentYClass"></div>
    </div>

    <div class="content-area">
      <slot></slot>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const colorOptions: readonly string[] = [
  'orange', 'red', 'plum', 'portage', 'light-blue', 'cornflower-blue', 'steel-blue', 'white',
];
const accentYOptions: readonly string[] = [
  ...colorOptions, 'none',
];
export default Vue.extend({
  props: {
    borderColor: {
      type: String,
      default: 'light-blue',
      validator(value) {
        if (!colorOptions.includes(value)) {
          console.error(`borderColor must be one of the following: ${colorOptions}`);
          return false;
        }
        return true;
      },
    },
    accentX: {
      type: Boolean,
      default: false,
    },
    accentY: {
      type: String,
      default: 'none',
      validator(value) {
        if (!accentYOptions.includes(value)) {
          console.error(`accentY must be one of the following: ${accentYOptions}`);
          return false;
        }
        return true;
      },
    },
  },
  computed: {
    accentYClass(): string {
      if (this.accentY === 'none') return '';
      return `accent-y-fill tng-${this.accentY}`;
    },
    colorClass(): string {
      return `tng-${this.borderColor}`;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

$border-width: 4%;
$content-height: 100% - $border-width;
$border-height: 4%;
$content-width: 100% - $border-width;

.border-container {
  background-color: black;
  width: 100%;
  height: 100%;
  position: relative;
}
.border {
  width: 100%;
  height: 100%;
  border-bottom-left-radius: $banner-radius;
}

.tail-accent {
  position: absolute;
  bottom: 0;
  right: $border-width;
  height: $border-height;
  width: $gap;
  background-color: black;
}
.accent-x-cut {
  position: absolute;
  bottom: 0%;
  right: 40%;
  height: $border-height;
  width: 20%;
  background-color: black;

  .cut-cover {
    height: 50%;
    margin-left: $gap;
    margin-right: $gap;
  }
}

.accent-y-container {
  position: absolute;
  left: 0;
  top: 30%;
  height: 40%;
  width: $border-width;
  background-color: black;

  .accent-y-fill {
    height: calc(100% - #{$gap} * 2);
    width: 100%;
    margin-top: $gap;
    margin-bottom: $gap;
  }
}

.content-area {
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  height: $content-height;
  width: $content-width;
  border-bottom-left-radius: $padding;
}

@media only screen and (max-width: 899px) {
  .border {
    border-bottom-left-radius: $banner-radius-sm;
  }
}
</style>
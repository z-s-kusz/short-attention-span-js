<template>
  <div class="border-container">
    <div class="border" :class="colorClass"></div>

    <div class="tail-accent"></div>

    <div :class="accentXClass">
      <div v-if="accentX === 'cut'" class="cut-cover" :class="colorClass"></div>
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
const accentXOptions: readonly string[] = [
  'none', 'cut',
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
      type: String,
      default: 'none',
      validator(value) {
        if (!accentXOptions.includes(value)) {
          console.error(`accentX must be one of the following: ${accentXOptions}`);
          return false;
        }
        return true;
      },
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
    accentXClass(): string {
      if (this.accentX === 'none') return '';
      return `accent-x-${this.accentX}`;
    },
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
  right: 4%;
  height: 4%;
  width: 4px;
  background-color: black;
}
.accent-x-cut {
  position: absolute;
  bottom: 0%;
  right: 40%;
  height: 4%;
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
  width: 4%;
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

  height: 96%;
  background-color: black;
  width: 96%;
  border-bottom-left-radius: $padding;
}

@media only screen and (max-width: 899px) {
  .border {
    border-bottom-left-radius: $banner-radius-sm;
  }
}
</style>

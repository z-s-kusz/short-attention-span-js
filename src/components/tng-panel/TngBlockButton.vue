<template>
<div class="block-button-container">
  <div class="block-button" :class="blockButtonClass">
    <span class="button-text" :class="buttonTextClass">
      <slot></slot>
    </span>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

const textPositionOptions: readonly string[] = ['tr', 'br', 'bl', 'tl'];
const roundSidesOptions: readonly string[] = ['none', 'top', 'right', 'bottom', 'left', 'all'];
const colorOptions: readonly string[] = [
  'orange', 'red', 'plum', 'portage', 'light-blue', 'cornflower-blue', 'steel-blue', 'white',
];
export default Vue.extend({
  props: {
    roundSides: {
      type: String,
      default: 'none',
      validator(value) {
        if (!roundSidesOptions.includes(value)) {
          console.error(`roundSidesOptions must be one of the following: ${textPositionOptions}`);
          return false;
        }
        return true;
      },
    },
    textPosition: {
      type: String,
      default: 'tr',
      validator(value) {
        if (!textPositionOptions.includes(value)) {
          console.error(`textPosition must be one of the following: ${textPositionOptions}`);
          return false;
        }
        return true;
      },
    },
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
  },
  computed: {
    blockButtonClass(): string {
      let blockButtonClass = `tng-${this.color}`;
      if (this.roundSides !== 'none') blockButtonClass += ` round-${this.roundSides}`;
      return blockButtonClass;
    },
    buttonTextClass(): string {
      return `text-${this.textPosition}`;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

.block-button-container {
  background-color: black;
  height: 100%;
  width: 100%;
}
.block-button {
  position: relative;
  height: 100%;
  width: 100%;
}
.button-text {
  position: absolute;
  padding: 6px;
  color: black;
  font-size: 24px;
  text-transform: uppercase;
}

.text-tr {
  top: 0;
  right: 0;
}
.text-br {
  bottom: 0;
  right: 0;
}
.text-bl {
  bottom: 0;
  left: 0;
}
.text-tl {
  top: 0;
  left: 0;
}

.round-top {
  border-radius: $banner-radius $banner-radius 0 0;
}
.round-right {
  border-radius: 0 $banner-radius $banner-radius 0;
  & .button-text {
    padding-right: $banner-radius / 2;
  }
}
.round-bottom { // nice
  border-radius: 0 0 $banner-radius $banner-radius;
}
.round-left {
  border-radius: $banner-radius 0 0 $banner-radius;
  & .button-text {
    padding-left: $banner-radius / 2;
  }
}
.round-all {
  border-radius: $banner-radius;
  & .button-text {
    padding-right: $banner-radius / 2;
    padding-left: $banner-radius / 2;
  }
}
</style>

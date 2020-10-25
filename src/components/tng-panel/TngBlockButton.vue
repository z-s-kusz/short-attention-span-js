<template>
<div class="block-button-container">
  <div class="block-button"
    :class="blockButtonClass">
    <span class="button-text" :class="buttonTextClass">
      <slot></slot>
    </span>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

const textPositionOptions: readonly string[] = ['tr', 'br', 'bl', 'tl'];
const colorOptions: readonly string[] = [
  'orange', 'red', 'plum', 'portage', 'light-blue', 'cornflower-blue', 'steel-blue', 'white',
];
export default Vue.extend({
  props: {
    roundTR: {
      type: Boolean,
      default: false,
    },
    roundBR: {
      type: Boolean,
      default: false,
    },
    roundBL: {
      type: Boolean,
      default: false,
    },
    roundTL: {
      type: Boolean,
      default: false,
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
    bgColor: {
      type: String,
      default: 'orange',
      validator(value) {
        if (!colorOptions.includes(value)) {
          console.error(`bgColor must be one of the following: ${colorOptions}`);
          return false;
        }
        return true;
      },
    },
  },
  computed: {
    blockButtonClass(): string {
      let blockButtonClass = '';
      blockButtonClass += this.roundTR ? 'round-tr ' : '';
      blockButtonClass += this.roundBR ? 'round-br ' : '';
      blockButtonClass += this.roundBL ? 'round-bl ' : '';
      blockButtonClass += this.roundTL ? 'round-tl ' : '';
      blockButtonClass += `tng-${this.bgColor}`;
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

.round-tr {
  border-top-right-radius: 50px;
}
.round-br {
  border-bottom-right-radius: 50px;
}
.round-bl {
  border-bottom-left-radius: 50px;
}
.round-tl {
  border-top-left-radius: 50px;
}
</style>

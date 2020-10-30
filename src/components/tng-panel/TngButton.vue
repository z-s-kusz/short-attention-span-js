<template>
<div class="tng-component-root block-button"
  :class="blockButtonClass" type="button" @click="$emit('tng-btn-click', $event)">
  <span class="button-text" :class="buttonTextClass">
    <slot></slot>
  </span>
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

.block-button {
  position: relative;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: box-shadow 50ms ease-out;
  // prevent highlighting outer box on mobile which looks really bad on rounded buttons
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:active {
    box-shadow: inset 0px 0px 12px rgba(0,0,0,0.4);
  }
}
.button-text {
  position: absolute;
  padding: 6px;
  color: black;
  font-size: 24px;
  text-transform: uppercase;
  user-select: none;
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
  border-radius: var(--banner-radius) var(--banner-radius) 0 0;
}
.round-right {
  border-radius: 0 var(--banner-radius) var(--banner-radius) 0;
  & .button-text {
    padding-right: calc( var(--banner-radius) / 2 );
  }
}
.round-bottom { // nice
  border-radius: 0 0 var(--banner-radius) var(--banner-radius);
}
.round-left {
  border-radius: var(--banner-radius) 0 0 var(--banner-radius);
  & .button-text {
    padding-left: calc( var(--banner-radius) / 2 );
  }
}
.round-all {
  border-radius: var(--banner-radius);
  & .button-text {
    padding-right: calc( var(--banner-radius) / 2 );
    padding-left: calc( var(--banner-radius) / 2 );
  }
}
</style>

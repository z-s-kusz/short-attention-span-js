<template>
<div class="border" :class="borderClass">
  <div class="content-area">
    <slot></slot>
  </div>

  <div class="accent-tail"></div>

  <div class="accent-x-cut" v-if="accentX">
    <div class="cut-cover" :class="colorClass"></div>
  </div>

  <div class="accent-y-container" v-if="accentY !== 'none'">
    <div :class="accentYClass"></div>
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
const sideOptions: readonly string[] = ['tr', 'br', 'bl', 'br'];
export default Vue.extend({
  props: {
    color: {
      type: String,
      default: 'light-blue',
      validator(value) {
        if (!colorOptions.includes(value)) {
          console.error(`color must be one of the following: ${colorOptions}`);
          return false;
        }
        return true;
      },
    },
    sides: {
      type: String,
      default: 'bl',
      validator(value) {
        if (!sideOptions.includes(value)) {
          console.error(`sideOptions must be one of the following: ${sideOptions}`);
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
      return `tng-${this.color}`;
    },
    borderClass(): string {
      return `${this.colorClass} ${this.sides}-border`;
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

.border {
  position: relative;
  width: 100%;
  height: 100%;
}

.content-area {
  position: absolute;
  background-color: black;
}

.accent-tail {
  position: absolute;
  height: $border-height;
  width: $gap;
  background-color: black;
}

.accent-x-cut {
  position: absolute;
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

.tr-border {
  border-top-right-radius: $banner-radius;

  .content-area {
    top: $border-width;
    right: $border-width;
    left: 0;
    bottom: 0;
    border-top-right-radius: $padding;
  }
  .accent-tail {
    top: 0;
    left: $border-width;
  }
  .accent-x-cut {
    top: 0;
  }
  .accent-y-container {
    right: 0;
  }
}

.br-border {
  border-bottom-right-radius: $banner-radius;

  .content-area {
    top: 0;
    right: $border-width;
    left: 0;
    bottom: $border-width;
    border-bottom-right-radius: $padding;
  }
  .accent-tail {
    bottom: 0;
    left: $border-width;
  }
  .accent-x-cut {
    bottom: 0;
  }
  .accent-y-container {
    right: 0;
  }
}

.bl-border {
  border-bottom-left-radius: $banner-radius;

 .content-area {
    top: 0;
    right: 0;
    left: $border-width;
    bottom: $border-height;
    border-bottom-left-radius: $padding;
  }
  .accent-tail {
    bottom: 0;
    right: $border-width;
  }
  .accent-x-cut {
    bottom: 0;
  }
  .accent-y-container {
    left: 0;
  }
}

.tl-border {
  border-top-left-radius: $banner-radius;

 .content-area {
    top: $border-width;
    right: 0;
    left: $border-height;
    bottom: 0;
    border-top-left-radius: $padding;
  }
  .accent-tail {
    top: 0;
    right: $border-width;
  }
  .accent-x-cut {
    top: 0;
  }
  .accent-y-container {
    left: 0;
  }
}

@media only screen and (max-width: 899px) {
  .border {
    border-bottom-left-radius: $banner-radius-sm;
  }
}
</style>

<template>
  <div class="border-container">
    <div class="border" :class="borderClass"></div>

    <div class="tail-accent"></div>

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
export default Vue.extend({
  props: {
    mainColor: {
      type: String,
      default: 'light-blue',
      validator(value) {
        if (!colorOptions.includes(value)) {
          console.error(`mainColor must be one of the following: ${colorOptions}`);
          return false;
        }
        return true;
      },
    },
  },
  computed: {
    borderClass(): string {
      return `tng-${this.mainColor}`;
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

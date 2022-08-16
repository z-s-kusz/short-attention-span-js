<template>
  <div class="color-stack-box" :style="boxStyle"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CSSProperties } from 'vue/types/jsx.d';

export default Vue.extend({
  name: 'ColorStackBoxVue',
  props: {
    hsl: String,
    index: Number,
    isAnchor: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    boxStyle(): CSSProperties {
      return {
        'background-color': this.hsl,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';
  .color-stack-box {
    width: 20rem;
    height: 2rem;
    background-color: hsl(0, 0%, 100%)
  }
</style>

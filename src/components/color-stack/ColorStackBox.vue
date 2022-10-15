<template>
  <div class="color-stack-box" :style="boxStyle" @click="onBoxClick(index)">
    <AnchorIcon :hidden="!isAnchor" />
    <EmoticonIcon :hidden="!active" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CSSProperties } from 'vue/types/jsx.d';
import AnchorIcon from 'vue-material-design-icons/Anchor.vue';
import EmoticonIcon from 'vue-material-design-icons/Emoticon.vue';

export default Vue.extend({
  name: 'ColorStackBoxVue',
  props: {
    hsl: String,
    index: Number,
    isAnchor: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    onBoxClick: Function,
  },
  components: {
    AnchorIcon,
    EmoticonIcon,
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

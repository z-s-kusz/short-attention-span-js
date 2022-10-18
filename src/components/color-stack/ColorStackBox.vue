<template>
  <div class="color-stack-box" :class="{ shake: shake, active: active }"
    :style="boxStyle" @click="handleBoxClick()">
    <AnchorIcon :hidden="!isAnchor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CSSProperties } from 'vue/types/jsx.d';
import AnchorIcon from 'vue-material-design-icons/Anchor.vue';

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
    emptyColorString: String,
  },
  components: {
    AnchorIcon,
  },
  data() {
    return {
      shake: false, // shake to show user can't click
    };
  },
  computed: {
    boxStyle(): CSSProperties {
      return {
        'background-color': this.hsl,
      };
    },
  },
  methods: {
    handleBoxClick() {
      if (!this.isAnchor && !(this.hsl !== this.emptyColorString)) {
        this.onBoxClick(this.index, this.hsl);
      } else if (this.active) {
        // do the more gentle reminder bunp out instead of shake
      } else {
        // shake box 'no click, only look!'
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 1500);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';
  .color-stack-box {
    width: 20rem;
    height: 2rem;
    background-color: hsl(0, 0%, 100%);
    margin-top: 4px;
    margin-bottom: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  
    transition: transform 500ms;
  }

  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-2px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(4px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-6px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(6px, 0, 0);
    }
  }

  .active {
    transform: translateX(4rem);
  }
</style>

<template>
  <div class="color-stack-box" :class="{ shake: shake, active: active, remind: remind }"
    :style="boxStyle" @click="handleBoxClick()">
    <Lock :hidden="hideAnchor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CSSProperties } from 'vue/types/jsx.d';
import Lock from 'vue-material-design-icons/LockOutline.vue';

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
    gameWon: {
      type: Boolean,
      default: false,
    },
    onBoxClick: Function,
    emptyColorString: String,
  },
  components: {
    Lock,
  },
  data() {
    return {
      shake: false, // shake to show user can't click
      remind: false, // slight pop out to show active selection
    };
  },
  computed: {
    boxStyle(): CSSProperties {
      return {
        'background-color': this.hsl,
      };
    },
    hideAnchor(): boolean {
      return !this.isAnchor || this.gameWon;
    },
  },
  methods: {
    handleBoxClick() {
      if (!this.isAnchor && !(this.hsl !== this.emptyColorString)) {
        this.onBoxClick(this.index, this.hsl);
      } else if (this.active) {
        // gentle reminder bump out
        this.remind = true;
        setTimeout(() => {
          this.remind = false;
        }, 250);
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
    width: 32vw;
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
  .remind {
    transform: translateX(5rem);
  }
</style>

<template>
  <main>
    <color-stack-win :handleRestart="handleRestart" v-show="gameState === 'win'" />
    <color-stack-main :winningStack="winningStack" :handleWin="handleWin"
      v-if="gameState === 'playing'" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorStackMain from '@/components/color-stack/ColorStackMain.vue';
import ColorStackBoxModel from '@/models/ColorStackBoxModel';
import ColorStackWin from '@/components/color-stack/ColorStackWin.vue';

export default Vue.extend({
  name: 'ColorGolfParent',
  components: {
    ColorStackWin,
    ColorStackMain,
  },
  data() {
    return {
      gameState: 'playing', // playing, win, settings
      winningStack: [
        {
          hsl: 'hsl(227, 59%, 27%)', index: 0, isAnchor: true, active: false,
        }, // dark blue 0
        {
          hsl: 'hsl(240, 100%, 75%)', index: 1, isAnchor: false, active: false,
        }, // blue 1
        {
          hsl: 'hsl(254, 61%, 73%)', index: 2, isAnchor: false, active: false,
        }, // purple 2
        {
          hsl: 'hsl(286, 37%, 72%)', index: 3, isAnchor: true, active: false,
        }, // pink 3
        {
          hsl: 'hsl(334, 50%, 46%)', index: 4, isAnchor: false, active: false,
        }, // dark pink 4
      ] as ColorStackBoxModel[],
    };
  },
  methods: {
    handleRestart() {
      this.gameState = 'playing';
    },
    handleWin() {
      this.gameState = 'win';
    },
  },
});
</script>

<style lang="scss" scoped>

</style>

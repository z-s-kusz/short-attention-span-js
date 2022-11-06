<template>
  <main>
    <color-stack-main-menu :onPlayClick="startGame" v-show="gameState === 'settings'" />
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
import ColorStackMainMenu from '@/components/color-stack/ColorStackMainMenu.vue';
import pallettes from '@/services/color-box-helper';

// returns one random item from an array of any type
function getRandomPallette<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export default Vue.extend({
  name: 'ColorGolfParent',
  components: {
    ColorStackWin,
    ColorStackMain,
    ColorStackMainMenu,
  },
  data() {
    return {
      gameState: 'settings', // playing, win, settings
      winningStack: [] as ColorStackBoxModel[],
    };
  },
  methods: {
    handleRestart() {
      const options = {};
      this.startGame(options);
    },
    handleWin() {
      this.gameState = 'win';
    },
    // use options and strongly type it
    // eslint-disable-next-line
    startGame(_options: object) {
      this.setUpRandomGame();
      this.gameState = 'playing';
    },
    setUpRandomGame() {
      const pallette = getRandomPallette(pallettes);
      const anchorIndexes = [2, 8];
      this.winningStack = this.buildWinningStack(pallette, anchorIndexes);
    },
    buildWinningStack(pallette: string[], anchorIndexes: number[]): ColorStackBoxModel[] {
      return pallette.map((color, index) => {
        const isAnchor = anchorIndexes.includes(index);
        return {
          index,
          hsl: color,
          isAnchor,
          active: false,
        };
      });
    },
  },
});
</script>

<style lang="scss" scoped>

</style>

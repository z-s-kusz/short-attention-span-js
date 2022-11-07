<template>
  <main class="overflow-hide">
    <color-stack-main-menu :onPlayClick="startGame" v-show="gameState === 'main-menu'" />
    <color-stack-main :winningStack="winningStack" :handleWin="handleWin"
      v-if="gameState === 'playing' || gameState === 'win'" />
    <color-stack-win :handleRestart="handleRestart" v-show="gameState === 'win'" />
    <div class="reset-container" v-if="gameState === 'resetting'">
      <div class="spin">
        <star-face :size="60" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorStackMain from '@/components/color-stack/ColorStackMain.vue';
import ColorStackBoxModel from '@/models/ColorStackBoxModel';
import ColorStackWin from '@/components/color-stack/ColorStackWin.vue';
import ColorStackMainMenu from '@/components/color-stack/ColorStackMainMenu.vue';
import StarFace from 'vue-material-design-icons/StarFace.vue';
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
    StarFace,
  },
  data() {
    return {
      gameState: 'main-menu', // playing, win, main-menu, resetting
      winningStack: [] as ColorStackBoxModel[],
    };
  },
  methods: {
    handleRestart() {
      const options = {};
      this.gameState = 'resetting';
      setTimeout(() => {
        this.startGame(options);
      }, 800);
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
.overflow-hide {
  overflow: hidden;
}
.reset-container {
  height: 21rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spin {
  animation-name: spin;
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

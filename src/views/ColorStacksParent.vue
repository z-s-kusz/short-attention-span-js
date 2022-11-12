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
import helperPalettes from '@/services/color-box-helper';
import ColorStackPaletteModel from '@/models/ColorStackPaletteModel';

// returns one random item from an array of any type
function getRandomPallette<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

interface paletteInput {
  standardPalettes: string[][];
  largePalettes: string[][];
}
function mapPalettes(palettes: paletteInput): ColorStackPaletteModel[] {
  const flatPalettes = [...palettes.standardPalettes, ...palettes.largePalettes];
  return flatPalettes.map((palette, index) => {
    let size = 'standard';
    if (palette.length === 11) {
      size = 'large';
    }
    return {
      id: index,
      size,
      colors: palette,
    };
  });
}

interface optionsType {
  removePlayedPalettes: boolean;
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
      allPalettes: mapPalettes(helperPalettes),
      palettesPlayedIds: [] as number[],
    };
  },
  methods: {
    handleRestart() {
      const options = {
        removePlayedPalettes: true,
      } as optionsType;
      this.gameState = 'resetting';
      setTimeout(() => {
        this.startGame(options);
      }, 800);
    },
    handleWin() {
      this.gameState = 'win';
    },
    startGame(options: optionsType) {
      let palettes = this.allPalettes;
      if (options.removePlayedPalettes) {
        palettes = this.getUnplayedPalettes();
      }
      this.setUpRandomGame(palettes);
      this.gameState = 'playing';
    },
    setUpRandomGame(paletteObjects: ColorStackPaletteModel[]) {
      const palette = getRandomPallette(paletteObjects);
      this.palettesPlayedIds.push(palette.id);
      const anchorIndexes = this.getAnchorIndexes(palette.colors.length);
      this.winningStack = this.buildWinningStack(palette.colors, anchorIndexes);
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
    getAnchorIndexes(length: number): number[] {
      switch (length) {
        case 9:
          return [2, 8];
        case 11:
          return [0, 4, 10];
        default:
          return [0];
      }
    },
    getUnplayedPalettes(): ColorStackPaletteModel[] {
      // if all have been played reset and allow all
      if (this.palettesPlayedIds.length === this.allPalettes.length) {
        this.palettesPlayedIds = [];
        return this.allPalettes;
      }

      return this.allPalettes.filter((palette) => {
        return !this.palettesPlayedIds.includes(palette.id);
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.overflow-hide {
  overflow-x: hidden;
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

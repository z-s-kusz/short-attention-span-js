<template>
<div>
  <menu-settings v-show="gameState === 'menu'"
    v-on:start-click="startClick" />
  <color-golf v-show="gameState === 'playing'"
    v-bind="menuData" v-on:game-completed="gameCompleted" />
  <game-over v-if="gameState === 'completed'"
    v-bind:score-cards="scoreCards" v-bind:players="menuData.players"
    v-on:go-to-menu="goToMenu" />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorGolf from '@/components/color-golf/ColorGolf.vue';
import GameOver from '@/components/color-golf/GameOver.vue';
import MenuSettings from '@/components/color-golf/MenuSettings.vue';
import ScoreCardItem from '@/models/ScoreCard';

interface MenuData {
  distance: number;
  gameMode: string;
  numberOfHoles: number;
  playerCount: number;
  playerNames: string[];
}

export default Vue.extend({
  name: 'ColorGolfParent',
  components: {
    ColorGolf,
    GameOver,
    MenuSettings,
  },
  data() {
    return {
      gameState: 'menu', // menu, playing, completed
      menuData: {
        distance: 30,
        gameMode: 'standard',
        numberOfHoles: 9,
        playerCount: 1,
        playerNames: [
          'Player 1', 'Player 2', 'Player 3', 'Player 4',
        ],
      },
      scoreCards: [] as ScoreCardItem[][],
    };
  },
  methods: {
    gameCompleted(scoreCardData: ScoreCardItem[][]): void {
      this.scoreCards = scoreCardData;
      this.gameState = 'completed';
    },
    goToMenu(): void {
      this.gameState = 'menu';
    },
    startClick(menuData: MenuData): void {
      this.menuData = menuData;
      this.gameState = 'playing';
    },
  },
});
</script>

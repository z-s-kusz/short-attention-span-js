<template>
  <div>
      <menu-settings v-show="gameState === 'menu'"
        v-on:start-click="startClick" />
      <color-golf v-show="gameState === 'playing'"
        v-bind="menuData" v-on:game-completed="gameCompleted" />
      <game-over v-show="gameState === 'completed'"
        v-bind:score-cards="scoreCards" v-on:go-to-menu="goToMenu" />
  </div>
</template>

<script>
import ColorGolf from '@/components/color-golf/ColorGolf.vue';
import GameOver from '@/components/color-golf/GameOver.vue';
import MenuSettings from '@/components/color-golf/MenuSettings.vue';

export default {
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
      scoreCards: [],
    };
  },
  methods: {
    gameCompleted(scoreCardData) {
      this.scoreCards = scoreCardData;
      this.gameState = 'completed';
    },
    goToMenu() {
      this.gameState = 'menu';
    },
    startClick(menuData) {
      this.menuData = menuData;
      this.gameState = 'playing';
    },
  },
};
</script>

<style>

</style>

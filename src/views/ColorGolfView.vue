<template>
  <div>
      <ColorGolfMenu v-show="gameState === 'menu'"
        v-on:start-click="startClick"/>
      <ColorGolf v-show="gameState === 'playing'"
        v-bind="menuData"/>
      <!-- TODO: add game complete state component with stats and reset/continue button -->
      <h1 v-show="gameState === 'completed'">Thanks for playing! Refresh page to play again.</h1>
  </div>
</template>

<script>
import ColorGolf from '@/components/ColorGolf.vue';
import ColorGolfMenu from '@/components/ColorGolfMenu.vue';

export default {
  name: 'ColorGolfView',
  components: {
    ColorGolf,
    ColorGolfMenu,
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
    };
  },
  methods: {
    gameCompleted() {
      this.gameState = 'completed';
    },
    startClick(data) {
      this.menuData = data;
      this.gameState = 'playing';
    },
  },
};
</script>

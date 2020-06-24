<template>
  <main>
    Game Completed Here are some stats:
    <div>{{ scoreCards }}</div>
    <button v-on:click="goToMenu">Back to setup menu</button>
  </main>
</template>

<script>
import ScoreCardChart from '@/components/color-golf/ScoreCardChart.vue';

export default {
  name: 'GameOver',
  props: {
    scoreCards: {
      type: Array,
      default() {
        return {
          r: '0', // strings becuase of user input type
          g: '0',
          b: '0',
          strokes: 0,
        };
      },
    },
  },
  methods: {
    goToMenu() {
      this.$emit('go-to-menu');
    },
  },
};
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
button {
  margin: 12px;
}
</style>

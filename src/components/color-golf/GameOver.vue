<template>
  <main>
    <h3>Game stats for {{ playerNames[activeGraphIndex]}}:</h3>
    <div class="carosel-container" v-if="useCarosel">
      <button @click="traverse()">Previous</button>
      <button @click="traverse('next')">Next</button>
    </div>
    <!-- TODO show background as actual color on hover, fill lines in color -->
    <vue-apex-charts type="line" height="300" width="600"
      :series="chartDataRed" :options="chartOptionsRed" />
    <vue-apex-charts type="line"  height="300" width="600"
      :series="chartDataGreen" :options="chartOptionsGreen" />
    <vue-apex-charts type="line" height="300" width="600"
      :series="chartDataBlue" :options="chartOptionsBlue" />
    <button v-on:click="goToMenu">Back to setup menu</button>
  </main>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'GameOver',
  components: {
    VueApexCharts,
  },
  props: {
    scoreCards: {
      type: Array,
      default() {
        return {
          redActual: 0,
          greenActual: 0,
          blueActual: 0,
          redGuess: '0', // strings becuase of user input type
          greenGuess: '0',
          blueGuess: '0',
          strokes: 0,
        };
      },
    },
    playerNames: Array,
  },
  data() {
    return {
      activeGraphIndex: 0,
      chartOptionsRed: this.getChartPrototype('Red'),
      chartOptionsGreen: this.getChartPrototype('Green'),
      chartOptionsBlue: this.getChartPrototype('Blue'),
    };
  },
  computed: {
    chartDataRed() {
      const chartData = this.buildColorData('red', this.activeGraphIndex);
      const chartDataRed = [
        { name: 'Actual Value', data: chartData.actualDataSet },
        { name: 'Your Guess', data: chartData.guessDataSet },
      ];
      return chartDataRed;
    },
    chartDataGreen() {
      const chartData = this.buildColorData('green', this.activeGraphIndex);
      const chartDataRed = [
        { name: 'Actual Value', data: chartData.actualDataSet },
        { name: 'Your Guess', data: chartData.guessDataSet },
      ];
      return chartDataRed;
    },
    chartDataBlue() {
      const chartData = this.buildColorData('blue', this.activeGraphIndex);
      const chartDataRed = [
        { name: 'Actual Value', data: chartData.actualDataSet },
        { name: 'Your Guess', data: chartData.guessDataSet },
      ];
      return chartDataRed;
    },
    useCarosel() {
      return this.scoreCards.length > 1;
    },
  },
  methods: {
    buildColorData(color, scoreCardIndex) {
      const graphData = {
        actualDataSet: [],
        guessDataSet: [],
      };
      const playerScoreCard = this.scoreCards[scoreCardIndex];
      playerScoreCard.forEach((score) => {
        const yCoordinatesActual = score[`${color}Actual`];
        let yCoordinatesGuess = score[`${color}Guess`];
        yCoordinatesGuess = parseInt(yCoordinatesGuess, 10);
        graphData.actualDataSet.push(yCoordinatesActual);
        graphData.guessDataSet.push(yCoordinatesGuess);
      });
      return graphData;
    },
    getCategories() {
      return this.scoreCards[0].map((score, i) => {
        return i + 1;
      });
    },
    getChartPrototype(color) {
      return {
        chart: {
          height: 300,
          width: 600, // TODO allow fit to mobile sizes
          type: 'line',
          toolbar: {
            show: false,
          },
        },
        theme: {
          mode: 'dark',
        },
        markers: {
          size: 3,
        },
        stroke: {
          curve: 'straight',
        },
        colors: [color, 'white'], // sets data point and line color
        xaxis: {
          categories: this.getCategories(),
          title: {
            text: 'Hole Number',
          },
        },
        yaxis: {
          title: {
            text: `${color} Value`,
            style: {
              fontSize: 16,
              fill: color,
              color,
            },
          },
          min: 0,
          max: 255,
        },
      };
    },
    goToMenu() {
      this.$emit('go-to-menu');
    },
    traverse(direction) {
      const totalPlayers = this.scoreCards.length;
      if (direction === 'next') {
        this.activeGraphIndex = this.activeGraphIndex + 1 === totalPlayers
          ? 0
          : this.activeGraphIndex + 1;
      } else {
        this.activeGraphIndex = this.activeGraphIndex === 0
          ? totalPlayers - 1
          : this.activeGraphIndex - 1;
      }
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
  min-width: 140px;
}
.white-fill {
  fill: white !important;
}
.carousel-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

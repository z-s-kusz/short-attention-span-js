<template>
  <main>
    <h3>Game Stats for {{ playerNames[activeGraphIndex] }}:</h3>
    <div class="carosel-container" v-if="useCarosel">
      <button @click="traverse()">Previous</button>
      <button @click="traverse('next')">Next</button>
    </div>
    <!-- TODO show background as actual color on hover, fill lines in color -->
    <div class="chart-container">
      <vue-apex-charts type="line" height="300"
        :series="chartDataRed" :options="chartOptionsRed" />
    </div>
    <div class="chart-container">
      <vue-apex-charts type="line" height="300"
        :series="chartDataGreen" :options="chartOptionsGreen" />
    </div>
    <div class="chart-container">
      <vue-apex-charts type="line" height="300"
        :series="chartDataBlue" :options="chartOptionsBlue" />
    </div>
    <button v-on:click="goToMenu">Back to setup menu</button>
  </main>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
import ScoreCardItem from '@/models/ScoreCard';

@Component({
  components: {
    VueApexCharts,
  },
})
export default class GameOver extends Vue {
  activeGraphIndex = 0;
  chartOptionsRed = this.getChartPrototype('Red');
  chartOptionsGreen = this.getChartPrototype('Green');
  chartOptionsBlue = this.getChartPrototype('Blue');

  @Prop({
    default: [],
  }) playerNames!: string[];
  @Prop({
    default: [],
  }) scoreCards!: ScoreCardItem[][];

  get chartDataRed() {
    const chartData = this.buildColorData('red', this.activeGraphIndex);
    const chartDataRed = [
      { name: 'Actual Value', data: chartData.actualDataSet },
      { name: 'Your Guess', data: chartData.guessDataSet },
    ];
    return chartDataRed;
  }
  get chartDataGreen() {
    const chartData = this.buildColorData('green', this.activeGraphIndex);
    const chartDataRed = [
      { name: 'Actual Value', data: chartData.actualDataSet },
      { name: 'Your Guess', data: chartData.guessDataSet },
    ];
    return chartDataRed;
  }
  get chartDataBlue() {
    const chartData = this.buildColorData('blue', this.activeGraphIndex);
    const chartDataRed = [
      { name: 'Actual Value', data: chartData.actualDataSet },
      { name: 'Your Guess', data: chartData.guessDataSet },
    ];
    return chartDataRed;
  }
  get useCarosel() {
    return this.scoreCards.length > 1;
  }

  buildColorData(color: string, scoreCardIndex: number) {
    const graphData = {
      actualDataSet: [] as number[],
      guessDataSet: [] as number[],
    };
    const playerScoreCard = this.scoreCards[scoreCardIndex];
    playerScoreCard.forEach((score) => {
      // gross 'as any' workaround so typescript knows we only access valid properties of score
      const actual: 'redActual' | 'greenActual' | 'blueActual' = `${color}Actual` as any;
      const guess: 'redActual' | 'greenGuess' | 'blueGuess' = `${color}Guess` as any;
      const yCoordinatesActual: number = score[actual];
      const yCoordinatesGuess: number = score[guess];
      graphData.actualDataSet.push(yCoordinatesActual);
      graphData.guessDataSet.push(yCoordinatesGuess);
    });
    return graphData;
  }

  getCategories(): number[] {
    return this.scoreCards[0].map((score, i) => {
      return i + 1;
    });
  }

  getChartPrototype(color: string) {
    return {
      chart: {
        height: 300,
        width: '100%',
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
          text: `${color} (0 - 255)`,
          style: {
            fontSize: 16,
            fill: color,
            color,
          },
        },
      },
    };
  }

  goToMenu(): void {
    this.$emit('go-to-menu');
  }

  traverse(direction?: string) {
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
  }

}
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
.chart-container {
  width: 100%;
  max-width: 900px;
}
@media only screen and (max-width: 899px) {
  .chart-container {
    width: 90%;
  }
}
</style>

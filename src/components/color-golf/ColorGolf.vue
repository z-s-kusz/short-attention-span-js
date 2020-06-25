<template>
  <div class="container">
    <div class="title">
      <h1>Color Golf</h1>
    </div>

    <div class="info-panel">
      <span>{{ playerName }}</span><span>Hole {{ holeNumber }}</span>
    </div>

    <div class="course" v-bind:class="courseClass" v-bind:style="courseStyle">
      <div class="course-inner">
        <transition name="fade">
          <div class="course-message" v-show="showResults">{{ message }}</div>
        </transition>
          <button v-show="showContinueButton"
            class="course-button" v-on:click="next()">continue</button>
      </div>
    </div>

    <form>
      <div class="slider-container red">
        <button v-on:click.prevent="adjustSlider('red', -10)">-10</button>
        <button v-on:click.prevent="adjustSlider('red', -1)">-1</button>
        <div class="slider-display">
          <div>{{ red }}</div>
          <input type="range" min="0" max="255"
            v-model="red" class="slider">
        </div>
        <button v-on:click.prevent="adjustSlider('red', 1)">+1</button>
        <button v-on:click.prevent="adjustSlider('red', 10)">+10</button>
      </div>
      <div class="slider-container green">
        <button v-on:click.prevent="adjustSlider('green', -10)">-10</button>
        <button v-on:click.prevent="adjustSlider('green', -1)">-1</button>
        <div class="slider-display">
          <div>{{ green }}</div>
          <input type="range" min="0" max="255"
            v-model="green" class="slider">
        </div>
        <button v-on:click.prevent="adjustSlider('green', 1)">+1</button>
        <button v-on:click.prevent="adjustSlider('green', 10)">+10</button>
      </div>
      <div class="slider-container blue">
        <button v-on:click.prevent="adjustSlider('blue', -10)">-10</button>
        <button v-on:click.prevent="adjustSlider('blue', -1)">-1</button>
        <div class="slider-display">
          <div>{{ blue }}</div>
          <input type="range" min="0" max="255"
            v-model="blue" class="slider">
        </div>
        <button v-on:click.prevent="adjustSlider('blue', 1)">+1</button>
        <button v-on:click.prevent="adjustSlider('blue', 10)">+10</button>
      </div>
      <button v-on:click.prevent="enterClick()">enter</button>
    </form>

    <div v-for="(scoreCard, j) in scoreCards" v-bind:key="j">
      <span v-for="(score, index) in scoreCard" v-bind:key="index">
        <span v-if="index !== 0"> | </span>
        <span>{{ score.strokes }}</span>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ColorGolf',

  props: {
    distance: Number, // number the player must beat to complete the hole
    gameMode: String,
    numberOfHoles: Number,
    playerCount: Number,
    playerNames: Array,
  },

  data() {
    return {
      red: 127,
      green: 127,
      blue: 127,
      showResults: false,
      message: '',
      showContinueButton: false,
      currentColor: {
        r: 0, g: 0, b: 0, css: 'rgb(0,0,0)',
      },
      usersGuess: {
        r: 0, g: 0, b: 0, css: 'rgb(0,0,0)', strokes: 0,
      },
      activePlayerIndex: 0,
      holeNumber: 1,
      shotCount: 0,
    };
  },

  computed: {
    courseClass() {
      return {
        'show-user-guess': this.showResults,
      };
    },
    courseStyle() {
      return this.showResults ? {
        background: `linear-gradient(135deg, ${this.currentColor.css} 50%, ${this.usersGuess.css} 50%`,
      } : {
        'background-color': this.currentColor.css,
      };
    },
    playerName() {
      return this.playerNames[this.activePlayerIndex];
    },
    scoreCards() {
      const scoreCard = [];
      for (let i = 0; i < this.numberOfHoles; i++) {
        scoreCard.push({
          redActual: 0,
          greenActual: 0,
          blueActual: 0,
          redGuess: 0,
          greenGuess: 0,
          bluebGuess: 0,
          strokes: 0,
        });
      }
      const scoreCards = [];
      for (let i = 0; i < this.playerCount; i++) {
        scoreCards.push([...scoreCard]); // spread opporator creates unique arrays for each player
      }
      return scoreCards;
    },
  },

  created() {
    const color = this.getRandomColor();
    color.css = this.setColorCSS(color);
    this.currentColor = color;
  },

  methods: {
    adjustSlider(color, amount) {
      const colorValue = parseInt(this[color], 10); // slider changes value to a string!
      if (colorValue + amount > 255) {
        this[color] = 255;
      } else if (colorValue + amount < 0) {
        this[color] = 0;
      } else {
        this[color] = colorValue + amount;
      }
    },
    buildUsersGuessCSS() {
      const color = {
        r: this.red,
        g: this.green,
        b: this.blue,
        css: '',
      };
      color.css = this.setColorCSS(color);
      this.usersGuess = color;
    },
    calculateShotScore() {
      let score = 0;
      const target = this.currentColor;
      const attempt = this.usersGuess;
      // TODO is target.r value preventing simple math from working?
      score += Math.abs(target.r - attempt.r);
      score += Math.abs(target.g - attempt.g);
      score += Math.abs(target.b - attempt.b);
      return score;
    },
    enterClick() {
      if (this.red === '' || this.green === '' || this.blue === '') {
        return; // TODO give user feedback
      }
      if (this.showContinueButton) { // allows enter to double as continue button
        this.next();
        return;
      }
      this.shotCount++;
      this.buildUsersGuessCSS();
      const shotScore = this.calculateShotScore();

      if (shotScore <= this.distance) {
        const dialog = shotScore === 0 ? 'Exact match!!!' : 'It\'s in the hole!';
        this.message = `${dialog} | Diff: ${shotScore} | Shots Taken: ${this.shotCount}`;
        this.showContinueButton = true;
      } else if (this.shotCount >= 9) {
        this.message = 'Shot limit reached.';
        this.showContinueButton = true;
      } else {
        this.message = `Last shot diff: ${shotScore}`;
      }
      this.showResults = true;
    },
    gameOver() {
      this.$emit('game-completed', this.scoreCards);
      this.reset(true);
    },
    getRandomColor() {
      const color = {
        r: this.getRandomInt(255),
        g: this.getRandomInt(255),
        b: this.getRandomInt(255),
        css: '',
      };
      color.css = this.setColorCSS(color);
      return color;
    },
    getRandomInt(maxNum) { // return int from 0 through maxNum
      return Math.floor(Math.random() * Math.floor(maxNum + 1));
    },
    goToNextPlayer() {
      this.activePlayerIndex = this.activePlayerIndex + 1 === this.playerCount
        ? 0
        : this.activePlayerIndex + 1;
    },
    next() {
      const activeScoreCard = this.scoreCards[this.activePlayerIndex];
      activeScoreCard[this.holeNumber - 1] = {
        redActual: this.currentColor.r,
        greenActual: this.currentColor.g,
        blueActual: this.currentColor.b,
        redGuess: this.usersGuess.r,
        greenGuess: this.usersGuess.g,
        blueGuess: this.usersGuess.b,
        strokes: this.shotCount,
      };
      if (this.holeNumber >= this.numberOfHoles
        && this.activePlayerIndex + 1 === this.playerCount) {
        this.gameOver();
      } else {
        this.reset(false);
      }
    },
    reset(newGame) {
      if (newGame) {
        this.holeNumber = 1;
        this.activePlayerIndex = 0;
      } else {
        if (this.activePlayerIndex + 1 === this.playerCount) this.holeNumber++;
        if (this.playerCount > 1) this.goToNextPlayer();
      }
      this.showResults = false;
      this.showContinueButton = false;
      this.usersGuess = {
        r: 0, g: 0, b: 0, css: 'rgb(0,0,0)',
      };
      this.red = '';
      this.green = '';
      this.blue = '';
      this.message = '';
      this.shotCount = 0;
      this.currentColor = this.getRandomColor();
    },
    setColorCSS(color) {
      return `rgb(${color.r}, ${color.g}, ${color.b})`;
    },
  },

};
</script>

<style scoped>
* {
  font-weight: 600;
  color: white;
}
input {
  color: black;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  background-color: #333;
  min-height: 100%;
}
.info-panel {
  display: flex;
  align-content: space-between;
  align-items: center;
  width: 70%;
}
.info-panel span {
  width: 50%;
  align-self: center;
  margin: 8px;
}
.course {
  border: 8px solid white;
  width: 70%;
  height: 300px;
  display: flex;
  align-content: center;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 8px;
}
label {
  margin: 4px;
}
.course-inner {
  width:100%;
}
.course-message {
  font-size: 42px;
  color: black;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
}
button {
  /* TODO investigate why I need to override a siblings stylsheet here??? */
  min-width: 0;
}
.slider-container {
  display: flex;
}
.slider-display {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}
.slider:hover {
  opacity: 1;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-radius: 50%;
  background: #000;
  cursor: pointer;
}
.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-radius: 50%;
  background: #000;
  cursor: pointer;
}

.red button, .red .slider-display div {
  color: #f55;
}
.green button, .green .slider-display div {
  color: #5f5;
}
.blue button, .blue .slider-display div {
  color: #55f;
}
</style>

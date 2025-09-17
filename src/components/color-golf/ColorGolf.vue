<template>
  <div class="container">
    <color-golf-title></color-golf-title>

    <div class="info-panel">
      <transition name="down">
        <span :key="playerName">{{ playerName }}</span>
      </transition>
      <transition name="down">
        <span :key="holeNumber">Hole {{ holeNumber }}</span>
      </transition>
    </div>

    <div class="position-help">
      <transition name="down">
        <span :key="shotCount">Target Color{{ shotCount > 0 ? ' (left)' : '' }}&nbsp;</span>
      </transition>
      <transition name="down">
        <div :key="shotCount" v-if="shotCount > 0">
          <span class="lg-screen-spacer">/</span>
          <span>&nbsp;Your Guess (right)</span>
        </div>
      </transition>
    </div>

    <div class="course" v-bind:class="courseClass" v-bind:style="courseStyle">
      <div class="course-inner">
        <transition name="left">
          <div class="course-message" :key="message.shots" v-show="showResults">
            <p>{{ message.main }}</p>
            <p>{{ message.diff }}</p>
            <p>{{ message.shots }}</p>
          </div>
        </transition>
          <button v-show="showContinueButton"
            class="course-button" v-on:click="next()">Continue</button>
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
      <button v-on:click.prevent="enterClick()" class="cta">Enter&#9971;Guess</button>
    </form>

    <section class="scorecard">
      <div>Score Card</div>
      <div v-for="(scoreCard, j) in scoreCards" v-bind:key="j">
        <hr>
        <span>P{{ j + 1}}: </span>
        <span v-for="(score, index) in scoreCard" v-bind:key="index">
          <span v-if="index !== 0"> | </span>
          <span>{{ score.strokes }}</span>
        </span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';
import ColorGolfTitle from '@/components/color-golf/ColorGolfTitle.vue';
import ScoreCardItem from '@/models/ScoreCard';
import ColorGolfRange from '@/models/ColorGolfRange';

interface ColorGolfColor {
  r: number;
  g: number;
  b: number;
  css: string;
  strokes?: number;
}

@Component({
  components: {
    ColorGolfTitle,
  },
})
export default class ColorGolf extends Vue {
  // user input changes red, green & blue to strings
  // we force them back to numbers before doing anything with them
  red = 127;
  green = 127;
  blue = 127;
  readonly defaultColorValue = 127;
  showResults = false;
  message = {
    main: '',
    diff: '',
    shots: '',
  };
  showContinueButton = false;
  currentColor: ColorGolfColor = {
    r: 0, g: 0, b: 0, css: 'rgb(0,0,0)',
  };
  usersGuess: ColorGolfColor = {
    r: 0, g: 0, b: 0, css: 'rgb(0,0,0)', strokes: 0,
  };
  activePlayerIndex = 0;
  holeNumber = 1;
  shotCount = 0;
  recalculateScoreCards = false;
  scoreCards: ScoreCardItem[][] = []; // an array of scorecards, which are arrays

  // Props
  @Prop() distance!: number; // number the player must beat to complete the hole
  @Prop() gameMode!: string;
  @Prop({ default: 3 }) numberOfHoles!: number;
  @Prop({ default: 1 }) playerCount!: number;
  @Prop() playerNames!: string[];
  @Prop() ranges!: ColorGolfRange[];

  // Computed
  get courseClass() {
    return {
      'show-user-guess': this.showResults,
    };
  }
  get courseStyle() {
    return this.showResults ? {
      background: `linear-gradient(135deg, ${this.currentColor.css} 50%, ${this.usersGuess.css} 50%`,
    } : {
      'background-color': this.currentColor.css,
    };
  }
  get playerName() {
    return this.playerNames[this.activePlayerIndex];
  }

  // lifecycle
  created() {
    const color = ColorGolf.getRandomColor(this.ranges[0]);
    color.css = ColorGolf.setColorCSS(color);
    this.currentColor = color;
    this.setScoreCards();
  }

  // methods
  adjustSlider(color: 'red' |'blue' | 'green', amount: number): void {
    // slider changes value to a string, we must force it to a number
    // and place it in quotes so typescript accepts its type as a valid argument to parseInt
    const colorValue = parseInt(`${this[color]}`, 10);
    if (colorValue + amount > 255) {
      this[color] = 255;
    } else if (colorValue + amount < 0) {
      this[color] = 0;
    } else {
      this[color] = colorValue + amount;
    }
  }

  buildMessage(main: string, shotScore?: number, shotCount?: number): void {
    this.message = {
      main,
      diff: `Diff: ${shotScore}`,
      shots: `Strokes: ${shotCount}`,
    };
  }

  buildUsersGuessCSS(): void {
    const color = {
      r: this.red,
      g: this.green,
      b: this.blue,
      css: '',
    };
    color.css = ColorGolf.setColorCSS(color);
    this.usersGuess = color;
  }

  calculateShotScore(): number {
    let score = 0;
    const target = this.currentColor;
    const attempt = this.usersGuess;
    score += Math.abs(target.r - attempt.r);
    score += Math.abs(target.g - attempt.g);
    score += Math.abs(target.b - attempt.b);
    return score;
  }

  enterClick(): void {
    if (this.showContinueButton) { // allows enter to double as continue button
      this.next();
      return;
    }
    this.shotCount++;
    this.buildUsersGuessCSS();
    const shotScore = this.calculateShotScore();
    let dialog = '';

    if (shotScore <= this.distance) {
      dialog = shotScore === 0 ? 'Exact match!' : 'It\'s in the hole!';
      this.showContinueButton = true;
    } else if (this.shotCount >= 9) {
      dialog = 'Shot limit reached.';
      this.showContinueButton = true;
    } else if (this.shotCount === 8) {
      dialog = 'Last try on this hole.';
    } else if (this.userNeedsInputHelp()) {
      dialog = 'Use the sliders to enter your color guess. See How To Play for more help.';
    } else {
      dialog = `Min diff needed: ${this.distance}`;
    }
    this.buildMessage(dialog, shotScore, this.shotCount);
    this.showResults = true;
  }

  gameOver(): void {
    this.$emit('game-completed', this.scoreCards);
  }

  static getRandomColor(range: ColorGolfRange) {
    const color = {
      r: ColorGolf.getRandomInt(range.rMin, range.rMax),
      g: ColorGolf.getRandomInt(range.gMin, range.gMax),
      b: ColorGolf.getRandomInt(range.bMin, range.bMax),
      css: '',
    };
    color.css = ColorGolf.setColorCSS(color);
    return color;
  }

  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  goToNextPlayer(): void {
    this.activePlayerIndex = this.activePlayerIndex + 1 === this.playerCount
      ? 0
      : this.activePlayerIndex + 1;
  }

  next(): void {
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
      this.reset();
    }
  }

  reset(): void {
    if (this.activePlayerIndex + 1 === this.playerCount) this.holeNumber++;
    if (this.playerCount > 1) this.goToNextPlayer();
    this.showResults = false;
    this.showContinueButton = false;
    this.usersGuess = {
      r: 0, g: 0, b: 0, css: 'rgb(0,0,0)', strokes: 0,
    };
    this.red = this.defaultColorValue;
    this.green = this.defaultColorValue;
    this.blue = this.defaultColorValue;
    this.message = {
      main: '',
      diff: '',
      shots: '',
    };
    this.shotCount = 0;
    const nextRange = this.ranges[this.holeNumber - 1];
    this.currentColor = ColorGolf.getRandomColor(nextRange);
  }

  static setColorCSS(color: ColorGolfColor): string {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  // setScoreCards not using computed becuase we need to manually reset it when the game ends
  // which isn't posible with vue's computed properties
  setScoreCards() {
    const scoreCard: ScoreCardItem[] = [];
    for (let i = 0; i < this.numberOfHoles; i++) {
      scoreCard.push({
        redActual: 0,
        greenActual: 0,
        blueActual: 0,
        redGuess: 0,
        greenGuess: 0,
        blueGuess: 0,
        strokes: 0,
      });
    }
    const scoreCards = [];
    for (let i = 0; i < this.playerCount; i++) {
      scoreCards.push([...scoreCard]); // spread opporator creates unique arrays for each player
    }
    this.scoreCards = scoreCards;
  }

  userNeedsInputHelp(): boolean {
    // user likely hit enter without changing values;
    return this.usersGuess.r === this.defaultColorValue
      && this.usersGuess.g === this.defaultColorValue
      && this.usersGuess.b === this.defaultColorValue;
  }

  // watchers
  @Watch('playerCount') playerCountChanged(newVal: number, previousVal: number) {
    if (newVal !== previousVal) {
      this.setScoreCards();
    }
  }

  @Watch('numberOfHoles') numberOfHolesChanged(newVal: number, previousVal: number) {
    if (newVal !== previousVal) {
      this.setScoreCards();
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';

input {
  color: black;
}

/* Vue added transition properties */
.down-enter-active {
  transition: transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.down-enter {
  transform: translateY(-100%);
}
.down-leave-active {
  display: none;
}
.left-enter-active, .left-leave-active {
  transition: transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
}
.left-enter, .left-leave-to {
  transform: translateX(100%);
}

.container {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.info-panel {
  display: flex;
  align-content: space-between;
  align-items: center;
  overflow-y: hidden;

  span {
    margin: 8px;
  }
}

.position-help {
  display: flex;
  align-content: space-between;
  align-items: center;
  overflow-y: hidden;

  div, span {
    margin: 8px 0px;
  }
}

// exempt from project wide breakpoint of 900px
@media only screen and (max-width: 400px) {
  .lg-screen-spacer {
    display: none;
  }
}
.course {
  border: 8px solid white;
  width: 70%;
  height: 300px;
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
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
  font-size: 34px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 8px 36px;
  border-radius: 6px;

  p {
    margin: 0;
    padding: 4px;
    text-align: start;
    border-bottom: 1px solid white;
  }
  p:last-child {
    border-bottom: none;
  }
}

button {
  color: white;
  margin: 12px 18px 12px 18px;

  &:active {
    background-color: #222;
  }
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

.scorecard {
  margin: 8px 24px 24px 24px;
}

@media only screen and (max-width: 899px) {
  .course {
    width: 85%;
  }
  button {
    margin: 8px;
    padding: 6px 8px;

    &.cta {
      margin-top: 20px;
      padding: 10px;
    }
  }
  .course-message {
    font-size: 26px;
  }
  .scorecard {
    margin: 0 12px 18px 12px;
    font-size: 0.9rem;
  }
}
</style>

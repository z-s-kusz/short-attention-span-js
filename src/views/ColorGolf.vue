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
      <label>
        R:<input placeholder="0 - 255" v-model="red" type="number" min="0" max="255"/>
      </label>
      <label>
        G:<input placeholder="0 - 255" v-model="green" type="number" min="0" max="255" />
      </label>
      <label>
        B:<input placeholder="0 - 255" v-model="blue" type="number" min="0" max="255" />
      </label>
      <button v-on:click.prevent="enterClick()">enter</button>
    </form>

    <div>
      <span v-for="(score, index) in scoreCard" v-bind:key="index">
        <span v-if="index !== 0"> | </span>
        <span>{{ score }}</span>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ColorGolf',
  data() {
    return {
      red: '',
      green: '',
      blue: '',
      showResults: false,
      message: '',
      showContinueButton: false,
      currentColor: {
        r: 0, g: 0, b: 0, css: 'rgb(0,0,0)',
      },
      usersGuess: {
        r: 0, g: 0, b: 0, css: 'rgb(0,0,0)',
      },
      playerName: 'Player 1',
      holeNumber: 1,
      scoreCard: [],
      shotCount: 0,
      numberOfHoles: 9,
      scoreThreshold: 60, // number player must match to complete the hole
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
  },

  created() {
    const color = this.getRandomColor();
    color.css = this.setColorCSS(color);
    this.currentColor = color;
    for (let i = 0; i < this.numberOfHoles; i++) {
      this.scoreCard.push(0);
    }
  },

  methods: {
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
      score += Math.abs(target.r - attempt.r);
      score += Math.abs(target.g - attempt.g);
      score += Math.abs(target.b - attempt.b);
      return score;
    },
    enterClick() {
      if (this.red === '' || this.green === '' || this.blue === '') {
        return;
      }
      if (this.showContinueButton) { // doubles as continue button when continue is available
        this.next();
        return;
      }
      this.shotCount++;
      this.buildUsersGuessCSS();
      const shotScore = this.calculateShotScore();

      if (shotScore <= this.scoreThreshold) {
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
    next() {
      this.scoreCard[this.holeNumber - 1] = this.shotCount;
      if (this.holeNumber >= this.numberOfHoles) {
        const totalScore = this.scoreCard.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        this.message = `Thanks for playing color golf! Your total score today was ${totalScore}.`;
      } else {
        this.holeNumber++;
        this.reset(true);
      }
    },
    reset(resetCurrentColor) {
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
      if (resetCurrentColor) this.currentColor = this.getRandomColor();
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
input { /* make sure to reset color for forms */
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
button {
  border-radius: 8px;
  background-color: black;
  padding: 12px 32px;
}
label {
  margin: 4px;
}
.course-inner {
  width:100%;
}
.course-message {
  font-size: 48px;
  color: black;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
}
</style>

<template>
  <div class="container">
    <div class="title">
      <h1>Color Golf</h1>
    </div>

    <div class="course" v-bind:class="courseClass" v-bind:style="courseStyle">
      <div class="course-inner" v-if="showResults">
        <div class="course-message">{{ message }}</div>
        <button class="course-button" v-on:click="reset(true)">continue</button>
        <button class="course-button" v-on:click="reset(false)">mulligan</button>
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
      currentColor: {
        r: 0, g: 0, b: 0, css: 'rgb(0,0,0)',
      },
      usersGuess: {
        r: 0, g: 0, b: 0, css: 'rgb(0,0,0)',
      },
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
      this.calculateShotScore();
    },
    calculateShotScore() {
      let score = 0;
      const target = this.currentColor;
      const attempt = this.usersGuess;
      score += Math.abs(target.r - attempt.r);
      score += Math.abs(target.g - attempt.g);
      score += Math.abs(target.b - attempt.b);
      this.message = `Last shot dif: ${score}`;
    },
    enterClick() {
      if (this.red === '' || this.green === '' || this.blue === '') {
        return;
      }
      this.buildUsersGuessCSS();
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
    reset(resetCurrentColor) {
      this.showResults = false;
      this.usersGuess = {
        r: 0, g: 0, b: 0, css: 'rgb(0,0,0)',
      };
      this.red = '';
      this.green = '';
      this.blue = '';
      this.message = '';
      if (resetCurrentColor) this.currentColor = this.getRandomColor();
    },
    setColorCSS(color) {
      return `rgb(${color.r}, ${color.g}, ${color.b})`;
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  background-color: #333;
  min-height: 100%;
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
  color: white;
  padding: 12px 32px;
  font-weight: 600;
}
label, .course-message {
  color: white;
  font-weight: 600;
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

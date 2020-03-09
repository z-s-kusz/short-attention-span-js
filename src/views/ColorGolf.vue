<template>
  <div class="container">
    <div class="title">
      <h1>Color Golf</h1><h1 v-if="showResults">Results...</h1>
    </div>

    <div class="course" v-bind:class="courseClass" v-bind:style="courseStyle"></div>

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
    const colors = [
      {
        r: 255, g: 0, b: 0, css: '',
      },
      {
        r: 0, g: 255, b: 0, css: '',
      },
      {
        r: 0, g: 0, b: 255, css: '',
      },
      {
        r: 200, g: 120, b: 50, css: '',
      },
      {
        r: 40, g: 210, b: 100, css: '',
      },
    ];
    colors.forEach((color) => {
      color.css = this.setColorCSS(color);
    });
    this.currentColor = colors[this.getRandomInt(colors.length - 1)];
  },
  methods: {
    enterClick() {
      if (this.red === '' || this.green === '' || this.blue === '') {
        return;
      }
      this.buildUsersGuessCSS();
      this.showResults = true;
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
    getRandomInt(maxNum) { // return int from 0 through maxNum
      return Math.floor(Math.random() * Math.floor(maxNum));
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
  background-color: dimgrey;
  min-height: 100%;
}
.course {
  border: 8px solid white;
  width: 70%;
  height: 300px;
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
label {
  color: white;
  font-weight: 600;
}
</style>

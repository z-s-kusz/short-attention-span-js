<template>
  <div class="poem-container">
    <h1 class="secondary">{{ title }}</h1>
    <h6 class="secondary">by {{ author }}</h6>
    <main class="tertiary">
      <p v-for="(line, i) in lines" :key="i">{{ line }}</p>
    </main>
  </div>
</template>

<script>
const axios = require('axios').default;
// const baseUrl = 'https://poetry-app-api.herokuapp.com/poetry';
const baseUrl = 'http://localhost:3000/poetry';

export default {
  name: 'Poem',
  data() {
    return {
      author: '',
      title: '',
      lines: [],
    };
  },
  created() {
    this.author = this.$route.params.author;
    this.title = this.$route.params.title;
    this.getPoem();
  },
  methods: {
    getPoem() {
      axios.get(`${baseUrl}/title/${this.title}/author/${this.author}`).then((res) => {
        console.log('res', res);
        this.lines = res.data[0].lines;
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style>

</style>

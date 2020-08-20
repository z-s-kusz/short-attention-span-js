<template>
  <div class="main-container">
    <h1>Poetry app page here!</h1>
    <poem v-bind="poem"></poem>
  </div>
</template>

<script>
import Poem from '@/components/poetry/Poem.vue';
const axios = require('axios').default;
const baseUrl = 'http://localhost:3000/poetry';

export default {
  name: 'PoetryParent',
  components: {
    Poem,
  },
  data() {
    return {
      sideNavOpen: false,
      poem: {
        author: '',
        title: '',
        lines: [],
      },
    };
  },
  created() {
    this.getPoem();
  },
  methods: {
    getPoem() {
      const url = `${baseUrl}/title/Lines Written In Early Spring/author/William Wordsworth`;
      axios.get(url).then((poemObj) => {
        this.poem = poemObj.data;
      }).catch((err) => {
        console.error('Err getting poem', err);
      });
    },
    toggleSideNav() {
      this.sideNavOpen = !this.sideNavOpen;
    },
  },
};
</script>

<style>
.main-container {
  background: linear-gradient(145deg, rgba(2,0,36,1) 0%,
    rgb(35, 112, 2) 29%, rgb(0, 159, 190) 100%);
}
</style>

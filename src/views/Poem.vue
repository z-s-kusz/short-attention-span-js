<template>
<div class="flex-container">
  <div class="poem-container">
    <h1 class="secondary">{{ title }}</h1>
    <h6 class="secondary">by {{ author }}</h6>
    <main class="tertiary">
      <p v-for="(line, i) in lines" :key="i">{{ line }}</p>
    </main>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import apiConfig from '@/services/poetry-api';

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
      axios.get(`${apiConfig.baseUrl}/title/${this.title}/author/${this.author}`).then((res) => {
        console.log('res', res);
        this.lines = res.data[0].lines;
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>
<!-- TODO fix styles are broken on poems when loading directly to poem page -->
<style>
/* Most styles applied from sibling PoemListing.vue */
</style>

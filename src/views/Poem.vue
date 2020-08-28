<template>
<div class="flex-container">
  <div class="poem-container" :style="secondaryStyle">
    <h1 :style="primaryStyle">{{ title }}</h1>
    <h6>by {{ author }}</h6>
    <main>
      <p v-for="(line, i) in lines" :key="i" :style="tertiaryStyle">{{ line }}</p>
    </main>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import apiConfig from '@/services/poetry-api';
import PaletteHelper from '@/services/palette-helper';

export default {
  name: 'Poem',
  data() {
    return {
      author: '',
      title: '',
      lines: [],
    };
  },
  computed: {
    primaryStyle() {
      return {
        'background-color': PaletteHelper.store.colors[3],
        color: PaletteHelper.store.colors[1],
      };
    },
    secondaryStyle() {
      return {
        background: `linear-gradient(145deg, ${PaletteHelper.store.colors[2]} 0%,
          ${PaletteHelper.store.colors[3]}) 100%`,
        'border-color': PaletteHelper.store.colors[0],
      };
    },
    tertiaryStyle() {
      return {
        color: PaletteHelper.store.colors[1],
      };
    },
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
<!-- TODO fix styles are broken on poems when loading directly to poem page
Fix accesibility with poem fonts by adding black white text option-->
<style>
/* Most styles applied from sibling PoemListing.vue */
</style>

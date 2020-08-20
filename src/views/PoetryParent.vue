<template>
  <div class="main-container">
    <poem v-if="display === 'poem'" v-bind="poem"></poem>
    <poem-listing v-if="display === 'list'"
      v-on:link-click="linkClick" v-bind="poemListingData">
    </poem-listing>
  </div>
</template>

<script>
import Poem from '@/components/poetry/Poem.vue';
import PoemListing from '@/components/poetry/PoemListing.vue';
const axios = require('axios').default;
const baseUrl = 'https://poetry-app-api.herokuapp.com/poetry';
// const baseUrl = 'http://localhost:3000/poetry';

export default {
  name: 'PoetryParent',
  components: {
    Poem,
    PoemListing,
  },
  data() {
    return {
      sideNavOpen: false,
      display: 'list', // list, poem
      poem: {
        author: '',
        title: '',
        lines: [],
      },
      poemListingData: {
        author: '',
        items: [],
        mode: 'authors',
      },
    };
  },
  created() {
    this.linkClick({
      item: '',
      path: '/authors',
      mode: '',
    });
  },
  methods: {
    linkClick(linkObj) {
      const { item, path, mode } = linkObj;
      axios.get(baseUrl + path).then((dataObj) => {
        if (mode === 'poems') {
          this.display = 'poem';
          this.poem = dataObj.data;
        } else if (mode === 'authors') {
          this.display = 'list';
          this.poemListingData.items = dataObj.data.map((data) => {
            return data.title;
          });
          this.poemListingData.author = item;
          this.poemListingData.mode = 'poems';
        } else { // show all authors call
          this.display = 'list';
          this.poemListingData.items = dataObj.data.authors;
          this.poemListingData.author = '';
          this.poemListingData.mode = 'authors';
        }
      }).catch((err) => {
        console.error(err);
      });
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

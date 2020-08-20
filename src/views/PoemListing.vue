<template>
  <div class="poem-container">
    <h1>{{ header }}</h1>
      <router-link v-for="(item, i) in items" :key="i"
        :to="item.link" class="link">{{item.value}}
      </router-link>
  </div>
</template>

<script>
const axios = require('axios').default;
// const baseUrl = 'https://poetry-app-api.herokuapp.com/poetry';
const baseUrl = 'http://localhost:3000/poetry';

export default {
  name: 'PoemListing',
  data() {
    return {
      author: '',
      items: [],
    };
  },
  computed: {
    header() {
      return this.$route.params.author ? `Poems by ${this.author}` : 'All Authors';
    },
  },
  created() {
    if (this.$route.params.author) {
      this.author = this.$route.params.author;
      this.getPoemsByAuthor();
      return;
    }
    this.getAllAuthors();
  },
  methods: {
    getAllAuthors() {
      const storedList = JSON.parse(localStorage.getItem('authors'));
      // api NEVER changes, just store the list
      if (storedList && storedList.length) {
        this.items = storedList.map((author) => {
          return {
            value: author,
            link: `/poetry/author/${author}`,
          };
        });
      } else {
        axios.get(`${baseUrl}/authors`).then((res) => {
          const storedAuthors = JSON.stringify(res.data.authors);
          localStorage.setItem('authors', storedAuthors);

          this.items = res.data.authors.map((author) => {
            return {
              value: author,
              link: `/poetry/author/${author}`,
            };
          });
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    getPoemsByAuthor() {
      axios.get(`${baseUrl}/author/${this.$route.params.author}`).then((res) => {
        this.author = this.$route.params.author;
        this.items = res.data.map((item) => {
          return {
            value: item.title,
            link: `/poetry/poem/${item.title}/author/${this.author}`,
          };
        });
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style scoped>
.link:hover {
  cursor: pointer;
  box-shadow:0 0 18px rgb(252, 255, 92);
}
.link {
  color: white;
  display: block;
}
.poem-container {
  background: linear-gradient(145deg, rgba(2,0,36,1) 0%,
    rgb(35, 112, 2) 29%, rgb(0, 159, 190) 100%);
  min-height: calc(100vh - 118px);
}
</style>

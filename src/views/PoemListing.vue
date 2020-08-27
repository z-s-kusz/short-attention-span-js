<template>
<div class="flex-container">
  <main class="poem-container" :style="secondaryStyle">
    <h1 :style="primaryStyle">{{ header }}</h1>

    <router-link v-for="(item, i) in items" :key="i"
      :to="item.link" class="link" :style="tertiaryStyle">{{item.value}}
    </router-link>

    <transition name="fade" appear>
      <div v-show="loading" key="1">
        <p>Loading...</p>
        <p>Initial loading may take longer becuase the free
          server from Heroku needs to be woken up first!
        </p>
      </div>
    </transition>
  </main>
</div>
</template>

<script>
import axios from 'axios';
import apiConfig from '@/services/poetry-api';
import PalleteHelper from '@/services/pallete-helper';

export default {
  name: 'PoemListing',
  data() {
    return {
      author: '',
      items: [],
      loading: false,
    };
  },
  computed: {
    header() {
      return this.$route.params.author ? `Poems by ${this.author}` : 'All Authors';
    },
    primaryStyle() {
      return {
        'background-color': PalleteHelper.store.colors[3],
        color: PalleteHelper.store.colors[1],
      };
    },
    secondaryStyle() {
      return {
        background: `linear-gradient(145deg, ${PalleteHelper.store.colors[2]} 0%,
          ${PalleteHelper.store.colors[3]}) 100%`,
        'border-color': PalleteHelper.store.colors[0],
      };
    },
    tertiaryStyle() {
      return {
        color: PalleteHelper.store.colors[1],
      };
    },
  },
  created() {
    if (!apiConfig.store.serverIsWoke) this.wakeServer();

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
        this.loading = true;

        axios.get(`${apiConfig.baseUrl}/authors`).then((res) => {
          this.loading = false;
          if (!apiConfig.store.serverIsWoke) apiConfig.store.setServerIsWoke(true);

          const storedAuthors = JSON.stringify(res.data.authors);
          localStorage.setItem('authors', storedAuthors);

          this.items = res.data.authors.map((author) => {
            return {
              value: author,
              link: `/poetry/author/${author}`,
            };
          });
        }).catch((err) => {
          this.loading = false;
          console.error(err);
        });
      }
    },
    getPoemsByAuthor() {
      this.loading = true;

      axios.get(`${apiConfig.baseUrl}/author/${this.author}`).then((res) => {
        this.loading = false;
        if (!apiConfig.store.serverIsWoke) apiConfig.store.setServerIsWoke(true);

        this.items = res.data.map((item) => {
          return {
            value: item.title,
            link: `/poetry/poem/${item.title}/author/${this.author}`,
          };
        });
      }).catch((err) => {
        this.loading = false;
        console.error(err);
      });
    },
    wakeServer() {
      axios.get('https://poetry-app-api.herokuapp.com').then(() => {
        if (!apiConfig.store.serverIsWoke) apiConfig.store.setServerIsWoke(true);
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style>
/*** styles intended to apply to poem page as well!!! ***/
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.poem-container .link:hover {
  cursor: pointer;
  font-weight: 700;
}
.poem-container .link {
  color: white;
  display: block;
  padding: 4px 12px 4px 12px;
  text-decoration: none;
}
.poem-container .link:first-of-type {
  margin-top: 24px;
}
.poem-container h1 {
  padding: 36px 28px 24px 28px;
  margin: 0;
  background-color: rgb(110, 52, 110);
}
.poem-container {
  min-height: calc(100vh - 99px);
  border-radius: 20px;
  border: 36px solid #eeeeee;
  width: 80%;
  flex-direction: column;
  align-content: center;
  justify-content: start;
}

.fade-enter-active {
  transition: opacity 400ms;
  transition-delay: 2s;
}
.fade-enter {
  opacity: 0;
}
</style>

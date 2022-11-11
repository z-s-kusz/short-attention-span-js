<template>
<div class="flex-container">
  <div class="border-div" :style="borderStyle">
    <main class="poem-container" :style="secondaryStyle">
      <h1 :style="primaryStyle">{{ header }}</h1>

      <router-link v-for="(item, i) in items" :key="i"
        :to="item.link" class="link" :style="tertiaryStyle">{{item.value}}
      </router-link>

      <transition name="fade" appear>
        <div v-show="loading" key="1">
          <p>Loading...</p>
        </div>
      </transition>

      <p v-if="showError">There was an issue retrieving the data.
        <a @click="refresh()">Reload</a> and if the issue persists, bug Zach.
      </p>
    </main>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import PoetryApi from '@/services/poetry-api';
import PaletteHelper from '@/services/palette-helper';

interface PoemListItem {
  value: string;
  link: string;
}

export default Vue.extend({
  name: 'PoemListing',
  data() {
    return {
      author: '',
      items: [] as PoemListItem[],
      loading: false,
      showError: false,
    };
  },
  computed: {
    header(): string {
      return this.$route.params.author ? `Poems by ${this.author}` : 'All Authors';
    },
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
    borderStyle() {
      return {
        background: `linear-gradient(145deg, ${PaletteHelper.store.colors[0]} 0%,
          ${PaletteHelper.store.colors[1]}) 100%`,
      };
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
    getAllAuthors(): void {
      const storedList: string[] = JSON.parse(localStorage.getItem('authors') || '[]');
      // api NEVER changes, just store the list
      if (storedList.length) {
        this.items = storedList.map((author) => {
          return {
            value: author,
            link: `/poetry/author/${author}`,
          };
        });
      } else {
        this.loading = true;

        interface Response {
          data: {
            authors: string[];
          };
        }
        axios.get(`${PoetryApi.baseUrl}/authors`).then((res: Response) => {
          const storedAuthors = JSON.stringify(res.data.authors);
          localStorage.setItem('authors', storedAuthors);

          this.items = res.data.authors.map((author) => {
            return {
              value: author,
              link: `/poetry/author/${author}`,
            };
          });
          this.showError = true;
        }).catch((error) => {
          console.error(error);
          this.showError = true;
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    getPoemsByAuthor(): void {
      this.loading = true;

      interface Response {
        data: {
          title: string;
          author: string;
        }[];
      }
      axios.get(`${PoetryApi.baseUrl}/poems-by-author?name=${this.author}`).then((res: Response) => {
        this.items = res.data.map((item) => {
          const trimedTitle = PoetryApi.trimToCharLimit(item.title);
          return {
            value: item.title,
            link: `/poetry/poem/${trimedTitle}/author/${this.author}`,
          };
        });
        this.showError = false;
      }).catch(() => {
        this.showError = true;
      }).finally(() => {
        this.loading = false;
      });
    },
    refresh(): void {
      this.$router.go(0);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';
@import '~@/styles/poem.scss';
</style>

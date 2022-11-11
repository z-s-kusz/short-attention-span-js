<template>
<div class="flex-container">
  <div class="border-div" :style="borderStyle">
    <div class="poem-container" :style="secondaryStyle">
      <h1 :style="primaryStyle">{{ title }}</h1>
      <h6>by {{ author }}</h6>
      <main>
        <p v-for="(line, i) in lines" :key="i" :style="tertiaryStyle">{{ line }}</p>

        <transition name="fade" appear>
          <div v-show="loading" key="1">
            <p>Loading...</p>
            <p>Initial loading may take longer becuase the free
              server from Heroku needs to be woken up first!
            </p>
          </div>
        </transition>

        <p v-if="showError">There was an issue retrieving the poem.
          <a @click="refresh()">Reload</a> and if the issue persists, bug Zach.
        </p>
      </main>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import PoetryApi from '@/services/poetry-api';
import PaletteHelper from '@/services/palette-helper';

export default Vue.extend({
  name: 'Poem',
  data() {
    return {
      author: '',
      title: '',
      lines: [] as string[],
      loading: false,
      showError: false,
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
    borderStyle() {
      return {
        background: `linear-gradient(145deg, ${PaletteHelper.store.colors[0]} 0%,
          ${PaletteHelper.store.colors[1]}) 100%`,
      };
    },
  },
  created() {
    this.author = this.$route.params.author;
    this.title = this.$route.params.title;
    this.getPoem();
  },
  methods: {
    getPoem(): void {
      this.loading = true;
      interface Response {
        data: {
          title: string;
          lines: string[];
        }[];
      }
      const url = `${PoetryApi.baseUrl}/get-poem?title=${this.title}&author=${this.author}`;
      axios.get(url).then((res: Response) => {
        this.title = res.data[0].title;
        this.lines = res.data[0].lines;
        this.showError = false;
      }).catch((error) => {
        console.error(error);
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
<!-- TODO Fix accesibility with poem fonts by adding black white text option-->
<style lang="scss" scoped>
@import '~@/styles/main.scss';
@import '~@/styles/poem.scss';
</style>

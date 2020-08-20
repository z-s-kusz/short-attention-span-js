<template>
  <div>
    <h1 class="secondary">{{ header }}</h1>
      <p v-for="(item, i) in items" :key="i"
        @click="linkClicked(item)">{{ item }}
      </p>
  </div>
</template>

<script>
export default {
  name: 'PoemListing',
  props: {
    mode: String, // authors, poems
    author: String,
    items: Array,
  },
  computed: {
    header() {
      return this.mode === 'poems' ? `Poems by ${this.author}` : 'All Authors';
    },
  },
  methods: {
    linkClicked(item) {
      const path = this.mode === 'poems'
        ? `/title/${item}/author/${this.author}`
        : `/author/${item}`;
      this.$emit('link-click', {
        item,
        mode: this.mode,
        path,
      });
    },
  },
};
</script>

<style scoped>
p:hover {
  cursor: pointer;
  box-shadow:0 0 18px rgb(252, 255, 92);
}
</style>

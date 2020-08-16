<template>
  <div class="poem">
    <h1 class="secondary">{{ title }}</h1>
    <h6 class="secondary">by {{ author }}</h6>
    <main class="tertiary">
      <p v-for="(line, i) in lines" :key="i">{{ line }}</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Poem',
    props: {
    title: String,
    author: String,
    lines: Array,
  },
}
</script>

<style>
.poem {
  background-color: rgba(0,0,0,0);
}
</style>

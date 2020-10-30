<template>
<section class="container">
  <div>{{ paragraph1 }}</div>
</section>
</template>

<script lang="ts">
import Vue from 'vue';

const text = `Preposterous. Type many words out as fast as possible and don't worry about spelling
becuase this should be replaced anyway.
What do you think it will do with novel lines? Hopefully preserve them.
If not I can add new line characters every so often. I wonder how quickly I should make the typing
happen. Pretty fast I sould think.
Maybe 1 character every tenth of a second. Somewhere around there anyway.
Not much more or less I'd think. This looks like enough to test with.
Then we will have to loop it from the top. Anyway wow it actually works
way better than I thought it would. Supplementing with more content but this is a
smashing success. Another couple of lines would be greatly
beneficial to the text so it will approach the bottom without any scroll.`;

export default Vue.extend({
  data() {
    return {
      currentLetterIndex: 0,
      breakTime: 10,
      paragraph1: text,
    };
  },
  mounted() {
    this.printNextLetter();
  },
  methods: {
    printNextLetter() {
      this.paragraph1 = text.substring(0, this.currentLetterIndex);
      this.currentLetterIndex++;
      if (this.currentLetterIndex >= text.length) {
        this.currentLetterIndex = 0;
      }
      setTimeout(() => {
        this.printNextLetter();
      }, this.breakTime);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

div {
  text-align: left;
  font-size: 24px;
  // allows text to break at points as determined by the written text (ie \n)
  white-space: pre-line;
}
@media only screen and (max-width: 899px) {
  div {
    height: 460px;
  }
}
</style>

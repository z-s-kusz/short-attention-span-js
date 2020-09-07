<template>
<div class="flex-container">
  <main class="container">
    <h1>The Site</h1>
    <p>I love coding but I hate setting up projects. Even with cli tools allowing you to
      `creat-react-app newApp` or `ng create new myApp` there is still a lot that goes into
      starting up a web project.
      "Where do I want to host it? Do I want to do the styles or just use a
      framework/component library? Should I use one I know or learn another?
      Should I set up a CMS for the writing work? Should I do the little tasks myself to
      fight the node_modules size or just accept the bloat and get to MVP faster?"
    </p>
    <p>In contrast, one of my favorite things about going into work
      to program is that the infrastructure is just there. I can simply open the project and
      code - when everything else is out of the way at least :).
      To replicate that setting, I decided to create this catch all site.
    </p>
    <p>If you've navigated here through
      <a href="https://github.com/z-s-kusz" target="_blank">github</a>
      you will have seen that I called this project 'sas.js' - short attention span JS. It's home
      for any small idea or project I want to implement without thinking about where to put
      the project. To that end, it could also be called 'dfr.js' - decision fatigue
      remover JS. So here it is, a random mish mash of javascript ideas that anyone
      can browse through quickly. Thanks for viewing and I hope you find
      some of my small distraction pages entertaining!
    </p>
    <div class="spacer"></div>

    <h1 :style="poetryStyle">Poetry</h1>
    <p><em :style="poetryStyle">DISCLAIMER:</em>&nbsp;
      The available poems and poets were NOT selected by me.
      I simply grabbed an open poetry api and I'm presenting the info exactly as it comes back.
      I have not reviewed all available poems.
    </p>
    <p>The 'poetry' page started with 2 ideas:</p>
    <p>1. Create a quick way to access lots of poems. (It's literature, but tiny!)</p>
    <p>2. Create pill-like color palettes that
      I had seen on reddit and use them for ...whatever.
    </p>
    <p>Because this site is set up to do quick front end experiments, I didn't want
      to write a web scraper or make a database. I found a pretty cool open source poetry
      api to use <a href="https://github.com/thundercomb/poetrydb" target="_blank">here</a>.
      I did have to set up a quick back end (using Heroku) to get around
      CORS but it will be good to have should any other projects here require back end code.
    </p>
    <p>So, go read some poems! If you find depressing poetry, brighten it up with a lovely
      theme like 'Royal Folk.'
    </p>
    <div class="spacer"></div>

    <h1 class="mgs1">MGS1 Carousel</h1>
    <p>I wanted to challenge myself to recreate an iconic UI element from one of my favorite games.
      I have a detailed write up on that page, so I'll cut this one here.
    </p>
    <p>Note that the demo requires a large screen and keyboard but the
      writeup is accessible on mobile.
    </p>
    <div class="spacer"></div>

    <color-golf-title></color-golf-title>
    <p>I often find myself thinking of how to recreate css for sites I visit around the web.
      One part of that is coming up with what I think the rgb colors are for various themes and
      backgrounds. I thought I was pretty good at it until I actually made the color golf game,
      which tasks you with getting as close as you can to a random color with the 256 color range
      for red, green, and blue.
    </p>
    <p>Give it a try and see how good you are at blending colors!</p>
    <div class="spacer"></div>

    <h3>Zach Kusz</h3>
    <h4><a href="https://github.com/z-s-kusz" target="_blank">github.com/z-s-kusz</a></h4>
  </main>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorGolfTitle from '@/components/color-golf/ColorGolfTitle.vue';
import PaletteHelper from '@/services/palette-helper';

export default Vue.extend({
  name: 'About',
  components: {
    ColorGolfTitle,
  },
  computed: {
    poetryStyle() {
      return {
        color: PaletteHelper.store.colors[1],
        'background-color': PaletteHelper.store.colors[2],
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';

.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.container {
  max-width: 70%;
  background-color: #272727;
  border-radius: 10px;
  padding: 36px;
  padding-top: 18px;
  margin: 12px;
}
.spacer {
  border-bottom: 2px solid #f9f7f786;
  margin: 36px;
}
p {
  text-align: start;
  text-indent: 2em;
  &:last-of-type {
    margin-bottom: 42px;
  }
}
li {
  text-align: start;
}
h3, h4 {
  margin-bottom: 0;
}
a {
  color: #9aecc7;
}
.mgs1 {
  color: rgb(0, 162, 255);
}
</style>

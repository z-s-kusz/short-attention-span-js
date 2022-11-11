<template>
<div class="flex-container">
  <main class="container">
    <h1 class="main-theme">The Site</h1>
    <p>I love coding but I hate setting up projects. Even with cli tools allowing you to
      `creat-react-app newApp` there is still a lot that goes into starting up a web project.
      "How do I want to host it? Do I want to do the styles or just use a framework library?
      Should I set up a CMS for the writing work? Should I fight the node_modules size
      or just accept the bloat and get to MVP faster?"
    </p>
    <p>In contrast, one of my favorite things about coding at work
      is that the infrastructure is just there. I can simply open the project and
      code - when everything else is out of the way at least :).
      To replicate that setting, I created this catch all site.
    </p>
    <p>If you've navigated here through
      <a href="https://github.com/z-s-kusz" target="_blank">github</a>
      you will have seen that I called this project short attention span JS. It's home
      for any small idea I want to implement without thinking about set up.
      To that end, it could also be called "decision fatigue
      remover JS." So here it is, a random mish mash of javascript ideas to
      browse through quickly. Thanks for viewing and I hope you find
      some of my small distraction pages entertaining!
    </p>
    <div class="spacer"></div>

    <h1 class="poetry" :style="poetryStyle">Poetry</h1>
    <p><em :style="poetryEm">DISCLAIMER:</em>&nbsp;
      The available poems and poets were NOT selected by me.
      I have not reviewed all available poems.
    </p>
    <p>The 'poetry' page started with 2 ideas:</p>
    <p>1. Create a quick way to access lots of poems.</p>
    <p>2. Create pill-like color palettes that
      I had seen on reddit.
    </p>
    <p>Because this site is set up to do quick front end experiments, I didn't want
      to write a web scraper or make a database. I found a pretty cool open source poetry
      api to use <a href="https://github.com/thundercomb/poetrydb" target="_blank">here</a>.
      I did have to set up a quick back end (using Heroku) to get around
      CORS but it will be good to have, should any other projects here require back end code. * **
    </p>
    <p>So, go read some poems! If you find depressing poetry, brighten it up with a lovely
      theme like
      <span class="folk-secondary">"</span>
      <span class="folk-primary">Royal Folk</span>.<span class="folk-secondary">"</span>
    </p>
    <p>
      * Edit 1: Now that netlify functions have been improved I might migrate over to it in
      a future update.
    </p>
    <p>
      ** Edit 2: Migration successful! Not only was I able to convert my node/express api
      to netlify functions in less than 2 hours, I was able to remove the heroku specific
      "wakeup" server code. The netlify functions docs could use some work but I will definitely
      be using them again.
      Here's hoping netlify stays free (or at least cheap).

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

    <h1 class="z468">&lt;&lt;The Z468&gt;&gt;</h1>
    <p>An emulator for a non-existent chip. I enjoyed the fake assembly from TIS-100
      and wanted to try to make my own assembly and style up a classic terminal interface.
    </p>
    <div class="spacer"></div>

    <h3>Zach Kusz</h3>
    <h4><a href="https://github.com/z-s-kusz" target="_blank">github.com/z-s-kusz</a></h4>
    <h4>
      <a href="https://trello.com/b/oGoAIsZA/sas-js" target="_blank">sas.js Trello Board</a>
    </h4>
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
    poetryEm() {
      return {
        color: PaletteHelper.store.colors[1],
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
@media only screen and (max-width: 899px) {
  .container {
    max-width: 85%;
    padding-right: 18px;
    padding-left: 18px;
  }
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
.main-theme {
  color: $vue-green;
}
.poetry {
  border-radius: 8px;
}
.folk-primary {
  color: rgb(201, 72, 91);
}
.folk-secondary {
  color: rgb(232, 157, 162);
}
.mgs1 {
  color: rgb(0, 162, 255);
}
.z468 {
  background-color: black;
  color: #4DB7C2;
}
</style>

<template>
  <v-app>
    <div class="app">
      <play-box :chord="chord" />
      <div class="chords-conf-box">
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </div>
      <play-conf-box @change-chord="onChangeChord" />
    </div>
  </v-app>
</template>

<script>
import PlayBox from "./components/PlayBox.vue";
import PlayConfBox from "./components/PlayConfBox.vue";

export default {
  name: "App",

  components: {
    PlayBox,
    PlayConfBox,
  },

  data: () => ({
    chord: "some chord",
  }),

  methods: {
    onChangeChord(newChord) {
      this.chord = newChord;
    },
  },
};
</script>

<style scoped>
* {
  border: 0;
  margin: 0;
}

body {
  font-family: "Helvetica", "Arial", serif;
}

.app {
  width: 100vw;
  height: 100vh;
  display: grid;

  grid-template-areas:
    "main"
    "conf1"
    "conf2";
}

@media (min-width: 1000px) {
  .app {
    grid-template-columns: auto 20rem;
    grid-template-areas:
      "main conf1"
      "main conf2";
  }
}

.chords-conf-box {
  grid-area: conf1;
  background-color: hotpink;
}
</style>
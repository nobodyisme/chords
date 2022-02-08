<template>
  <div class="play-box">
    <div class="top"></div>
    <!--<div class="chord-panel">C<sub>♭</sub><sup>M7</sup>/G<sub>♯</sub></div>-->
    <div class="chord-panel">{{ chord }}</div>
    <div class="hint-panel"></div>
  </div>
</template>

<script>
export default {
  name: "PlayBox",
  props: ["chord"],
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.play-box {
  height: 100vh;
  grid-area: main;

  display: grid;
  grid-template-rows: 1fr auto 1fr;
  justify-content: center;
}
.play-box .top {
}
.play-box .chord-panel {
  font-size: 10rem;
  color: #444;
}
.play-box .chord-panel sub {
  font-size: 0.6em;
}
.play-box .chord-panel sup {
  font-size: 0.6em;
}
.play-box .hint-panel {
}
</style>

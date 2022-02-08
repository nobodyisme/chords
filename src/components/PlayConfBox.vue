<template>
  <div></div>
</template>

<script>
function changeChord(self) {
  console.log("change chord");
  console.log(self);

  var index = Math.floor(Math.random() * chords.length);

  console.log("emitting");
  self.$emit("change-chord", chords[index]);
}

function scheduleChangeChord(self) {
  changeChord(self);
  setTimeout(
    (function (self) {
      return function () {
        scheduleChangeChord(self);
      };
    })(self),
    5000
  );
}

let chords = ["A", "B", "C"];

export default {
  name: "PlayConfBox",
  emits: ["change-chord"],
  mounted: function () {
    this.$nextTick(function () {
      scheduleChangeChord(this);
    });
  },
};
</script>

<style lang="scss" scoped>
.play-conf-box {
  grid-area: conf2;
  background-color: red;
}
</style>
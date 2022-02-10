<template>
  <div class="play-conf-box">
    <v-card-text>
      <v-row class="mb-4" justify="space-between">
        <v-col class="text-left">
          <span class="subheading font-weight-light mr-1">
            Chord change interval:
          </span>
        </v-col>
      </v-row>

      <v-row class="mb-4" justify="space-between">
        <v-col>
          <v-slider
            v-model="interval"
            :color="color"
            track-color="grey"
            always-dirty
            thumb-label="always"
            :thumb-size="28"
            :thumb-color="thumbcolor"
            min="1"
            max="60"
          >
            <template v-slot:thumb-label="{ value }"> {{ value }}s </template>

            <template v-slot:prepend>
              <v-icon :color="color" @click="decrement"> mdi-minus </v-icon>
            </template>

            <template v-slot:append>
              <v-icon :color="color" @click="increment"> mdi-plus </v-icon>
            </template>
          </v-slider>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
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
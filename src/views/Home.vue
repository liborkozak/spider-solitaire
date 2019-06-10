<template>
  <v-container fill-height>
    <v-layout row align-center>
      <v-container class="fields-container">
        <v-text-field
          v-model="username"
          :placeholder="loc.username"
          @input="validate(username)"
          :error-messages="errorMsg"
          solo
        ></v-text-field>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">{{loc.play}}</v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="(item, index) in levels" :key="index" @click="playGame(index + 1)">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn @click="redirectToScore">{{loc.highScore}}</v-btn>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import Base from "@/components/Base.vue";

export default {
  name: "ViewsHome",
  extends: Base,
  data() {
    return {
      error: false,
      username: "",
      levels: []
    };
  },
  computed: {
    errorMsg: function() {
      return this.error ? this.loc.errorMsg : "";
    }
  },
  created() {
    this.setupLevels();
  },
  methods: {
    setupLevels() {
      let loc = this.loc;
      this.levels = [
        { name: loc.lvl1 },
        { name: loc.lvl2 },
        { name: loc.lvl3 }
      ];
    },
    playGame(level) {
      let isValid = this.validate(this.username);
      if (isValid) {
        let username = encodeURIComponent(this.username);
        this.$router.push({
          name: "game",
          params: {
            username: username,
            level: level
          }
        });
      }
    },
    redirectToScore: function() {
      let isValid = this.validate(this.username);
      if (isValid) {
        let username = encodeURIComponent(this.username);
        this.$router.push({
          name: "score",
          params: {
            username: username
          }
        });
      }
    },
    validate(value) {
      this.error = !value;
      return !!value;
    }
  }
};
</script>

<style scoped>
.fields-container {
  max-width: 300px;
}
</style>
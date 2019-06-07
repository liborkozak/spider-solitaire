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
        <v-btn>{{loc.play}}</v-btn>
        <v-btn @click="redirectToScore">{{loc.highScore}}</v-btn>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import Base from '@/components/Base.vue';

export default {
  name: 'ViewsHome',
  extends: Base,
  data() {
    return {
      error: false,
      username: ''
    };
  },
  computed: {
    errorMsg: function() {
      return this.error ? this.loc.errorMsg : '';
    }
  },
  methods: {
    redirectToScore: function() {
      let isValid = this.validate(this.username);
      if (isValid) {
        let username = encodeURIComponent(this.username);
        this.$router.push({
          name: 'score',
          params: {
            username: username
          }
        });
      } else {
        this.error = true;
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
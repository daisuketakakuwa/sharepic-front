<template>
  <v-app>
    <v-app-bar
      app
      absolute
      elevate-on-scroll
      class="black white--text"
      height="50px"
    >
      <h1 id="header-title" class="text-center ml-5">
        SHAREPIC
      </h1>
    </v-app-bar>
    <v-main>
      <nuxt />
      <navigate-menu />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Default extends Vue {}
</script>

<style scoped>
#header-title {
  font-family: Bradley Hand ITC;
}
</style>

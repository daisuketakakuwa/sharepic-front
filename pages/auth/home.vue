<template>
  <v-container class="d-flex flex-wrap justify-start" width="100vw">
    <v-card outlined class="ma-2" v-for="card in cards" :key="card.src">
      <v-card-title class="card-title">{{ card.tag }}</v-card-title>
      <v-img class="white--text" width="350" height="250" :src="card.src" />
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Home extends Vue {
  cards = [
    {
      tag: "自然",
      src:
        "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/nature01.jpg"
    },
    {
      tag: "旅行",
      src:
        "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/yufuhosoi_20201123094646.jpg"
    },
    {
      tag: "一眼",
      src:
        "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/ucchiiii_20201121012311.JPG"
    }
  ];
}
</script>

<style scoped>
.card-title {
  font-family: "A1 Gothic R";
  font-size: 30px;
}
</style>

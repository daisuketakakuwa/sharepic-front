<template>
  <v-container class="d-flex flex-wrap justify-start" width="100vw">
    <v-card
      dark
      outlined
      elevation="4"
      class="ma-2"
      v-for="card in cards"
      :key="card.tag"
      @click="moveToSearch(card.tag)"
    >
      <v-card-title class="card-title">{{ card.tag }}</v-card-title>
      <v-img class="white--text" width="350" height="200" :src="card.src" />
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ServiceFactory from "@/domains/factory/ServiceFactory";
import CardService from "@/domains/card/CardService";
import CardForHome from "@/domains/card/CardForHome";

@Component
export default class Home extends Vue {
  cardService!: CardService;
  cards: CardForHome[] = [];

  async fetch() {
    this.cardService = await ServiceFactory.getCardService();
    this.cards = await this.cardService.getCardsForHome();
  }

  moveToSearch(tag: string) {
    this.$router.push({ path: `/auth/${tag}` });
  }
}
</script>

<style scoped>
.card-title {
  font-family: "A1 Gothic R";
  font-size: 30px;
}
</style>

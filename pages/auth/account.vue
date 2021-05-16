<template>
  <div>
    <v-container>
      <v-tabs>
        <v-tabs-slider color="primary" />
        <v-tab @click="switchGenre('yourPost')"
          ><span class="menu-item">YOUR POST</span></v-tab
        >
        <v-tab @click="switchGenre('yourFavorite')"
          ><span class="menu-item">YOUR FAVORITE</span></v-tab
        >
      </v-tabs>
    </v-container>
    <v-container class="d-flex flex-wrap justify-start" width="100vw">
      <v-card
        :outlined="false"
        class="ma-2"
        v-for="card in displayCards"
        :key="card.src"
        @click="showDialog(card)"
      >
        <v-img width="350" :src="card.src" />
      </v-card>
    </v-container>
    <picture-dialog
      :show-dialog.sync="dialog"
      :detail-src.sync="detailSrc"
      :detail-tags.sync="detailTags"
      :detail-desciption.sync="detailDescription"
      :detail-post-date.sync="detailPostDate"
      :detail-post-user.sync="detailPostUser"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ServiceFactory from "@/domains/factory/ServiceFactory";
import CardService from "@/domains/card/CardService";
import Card from "@/domains/card/Card";
import CardForAccount from "@/domains/card/CardForAccount";

@Component
export default class Account extends Vue {
  cardService!: CardService;

  cardForAccount!: CardForAccount;

  dialog: boolean = false;
  detailSrc: string = "";
  detailTags: any = [];
  detailDescription: string = "";
  detailPostDate: string = "";
  detailPostUser: string = "";

  displayCards: Card[] = [];
  favoriteCards: Card[] = [];
  yourCards: Card[] = [];

  async fetch() {
    this.cardService = await ServiceFactory.getCardService();
    this.cardForAccount = await this.cardService.getCardsForAccount();
    this.favoriteCards = this.cardForAccount.favoriteCards;
    this.yourCards = this.cardForAccount.yourCards;
    this.displayCards = this.yourCards;
  }

  switchGenre(genre: string) {
    if (genre === "yourPost") {
      this.displayCards = this.yourCards;
    } else if (genre === "yourFavorite") {
      this.displayCards = this.favoriteCards;
    }
  }

  showDialog(card: any) {
    this.dialog = true;
    this.detailSrc = card.src;
    this.detailTags = card.tag;
    this.detailDescription = card.description;
    this.detailPostDate = card.postDate;
    this.detailPostUser = card.postUser;
  }
}
</script>

<style scoped>
.menu-item {
  font-family: Bradley Hand ITC;
  font-weight: 900;
}
</style>

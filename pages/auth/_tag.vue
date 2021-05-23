<template>
  <div v-if="!$fetchState.pending">
    <v-container>
      <v-row justify="center">
        <v-col cols="4">
          <v-select v-model="inputTag" :items="tags" label="タグ名" />
        </v-col>
        <v-col cols="4">
          <v-select v-model="inputUsername" :items="names" label="ユーザー名" />
        </v-col>
        <v-col cols="2">
          <v-btn block dark height="45" @click="search">
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="!hasSearched && !$fetchState.pending">
        <v-col class="text-center text-h5" cols="12">
          <span class="font">FIND A GOOD PICTURE</span>
        </v-col>
      </v-row>
      <v-row v-if="hasSearched && cards.length == 0">
        <v-col class="text-center text-h5" cols="12">
          <span class="font">NO SEARCH RESULT</span>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="d-flex flex-wrap justify-start" width="100vw">
      <v-card
        :outlined="false"
        class="ma-2"
        v-for="card in cards"
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
import CardForSearch from "@/domains/card/CardForSearch";

@Component
export default class Search extends Vue {
  cardService!: CardService;
  cards: Card[] = [];
  tags: string[] = [];
  names: string[] = [];

  inputTag = "";
  inputUsername = "";

  dialog: boolean = false;
  hasSearched: boolean = false;
  detailSrc: string = "";
  detailTags: any = [];
  detailDescription: string = "";
  detailPostDate: string = "";
  detailPostUser: string = "";

  async fetch() {
    this.cardService = await ServiceFactory.getCardService();
    const tagsnames: CardForSearch = await this.cardService.getTagsAndNames();
    this.tags = tagsnames.tags;
    this.names = tagsnames.names;
    this.tags.push("※未指定");
    this.names.push("※未指定");

    // routerから「タグ」がわたってきている場合、タグで検索処理を実行する
    if (this.$route.params.tag !== "_tag") {
      this.cards = await this.cardService.search(this.$route.params.tag, "");
      this.inputTag = this.$route.params.tag;
      this.hasSearched = true;
    }
  }

  async search() {
    this.cards = await this.cardService.search(
      this.inputTag,
      this.inputUsername
    );
    this.hasSearched = true;
  }

  showDialog(card: any) {
    this.dialog = true;
    this.detailSrc = card.src;
    this.detailTags = card.tags;
    this.detailDescription = card.description;
    this.detailPostDate = card.postDate;
    this.detailPostUser = card.postUser;
  }
}
</script>

<style scoped>
.font {
  font-family: Bradley Hand ITC;
  font-weight: 900;
}
</style>

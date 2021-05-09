<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="9">
          <v-text-field outlined label="タグ名・説明・投稿者名" />
        </v-col>
        <v-col cols="2">
          <v-btn block dark height="55">
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
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

@Component
export default class Search extends Vue {
  dialog: boolean = false;

  detailSrc: string = "";
  detailTags: any = [];
  detailDescription: string = "";
  detailPostDate: string = "";
  detailPostUser: string = "";

  showDialog(card: any) {
    this.dialog = true;
    this.detailSrc = card.src;
    this.detailTags = card.tag;
    this.detailDescription = "上高地でとった写真";
    this.detailPostDate = "2021-05-07";
    this.detailPostUser = "田中";
  }

  cards = [
    {
      tag: ["一眼", "自然"],
      src:
        "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/ucchiiii_20201121012517.JPG"
    },
    {
      tag: ["一眼", "自然"],
      src:
        "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/ucchiiii_20201121012627.png"
    },
    {
      tag: ["一眼", "自然"],
      src:
        "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/ucchiiii_20201121012738.jpg"
    },
    {
      tag: ["一眼", "自然"],
      src:
        "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/ucchiiii_20201121012836.jpg"
    },
    {
      tag: ["一眼", "自然"],
      src:
        "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/ucchiiii_20201121012913.jpg"
    }
  ];
}
</script>

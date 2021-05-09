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

@Component
export default class Account extends Vue {
  dialog: boolean = false;
  detailSrc: string = "";
  detailTags: any = [];
  detailDescription: string = "";
  detailPostDate: string = "";
  detailPostUser: string = "";

  displayCards: any[] = [];
  favoriteCards: any[] = [];
  yourCards: any[] = [];

  fetch() {
    this.favoriteCards = [
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

    this.yourCards = [
      {
        tag: ["夏"],
        src:
          "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/takakuwa_20201121030733.jpg"
      },
      {
        tag: ["一眼", "自然"],
        src:
          "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/takakuwa_20201121030848.jpg"
      },
      {
        tag: ["一眼", "自然"],
        src:
          "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/takakuwa_20201121030927.jpg"
      },
      {
        tag: ["一眼", "自然"],
        src:
          "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/takakuwa_20201121031021.jpg"
      },
      {
        tag: ["一眼", "自然"],
        src:
          "https://xxsharepicxx.s3-ap-northeast-1.amazonaws.com/pictures/takakuwa_20201121031100.jpg"
      }
    ];

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
    this.detailDescription = "上高地でとった写真";
    this.detailPostDate = "2021-05-07";
    this.detailPostUser = "田中";
  }
}
</script>

<style scoped>
.menu-item {
  font-family: Bradley Hand ITC;
  font-weight: 900;
}
</style>

<template>
  <v-dialog v-model="syncedDisplayDialog" max-width="450px" max-height="90vh">
    <v-card @click="close">
      <v-img :src="syncedSrc" contain />
      <v-card-text>
        <br />
        <p>
          投稿日：{{ syncedPostDate }}<br />
          投稿者：{{ syncedPostUser }}<br />
          TAGS：
          <span v-for="tag in syncedTags" :key="tag"> #{{ tag }} </span>
        </p>
        <p>{{ syncedDescription }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, PropSync, Vue } from "nuxt-property-decorator";

@Component
export default class PictureDialog extends Vue {
  @PropSync("showDialog", { type: Boolean, default: false })
  syncedDisplayDialog!: boolean;
  @PropSync("detailSrc", { type: String, default: "" })
  syncedSrc!: string;
  @PropSync("detailTags", { type: Array, default: () => [] })
  syncedTags!: [];
  @PropSync("detailDesciption", { type: String, default: "" })
  syncedDescription!: string;
  @PropSync("detailPostDate", { type: String, default: "" })
  syncedPostDate!: string;
  @PropSync("detailPostUser", { type: String, default: "" })
  syncedPostUser!: string;

  close() {
    this.syncedDisplayDialog = false;
  }
}
</script>

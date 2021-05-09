<template>
  <v-container>
    <image-form :is-exist-image-file.sync="isExistImageFile" />
    <v-row>
      <v-col cols="11">
        <v-btn color="black white--text" @click="dialog = true"
          ><v-icon>mdi-plus</v-icon>TAG</v-btn
        >
        <v-btn color="gray" @click="clear">クリア</v-btn>
        <v-container class="d-flex flex-wrap justify-start" width="100vw">
          <v-chip
            class="mr-2 mt-2 white--text"
            color="black"
            v-for="tag in inputTags"
            :key="tag"
          >
            {{ tag }}
          </v-chip>
        </v-container>
      </v-col>
    </v-row>
    <tag-form-dialog
      :dialog.sync="dialog"
      :input-tag.sync="inputTag"
      header-title="タグ追加"
      ok-title="OK"
      cancel-title="CANCEL"
      @ok="addTag"
    />
    <v-textarea rows="2" outlined class="ma-2" label="説明(任意)"></v-textarea>
    <v-row>
      <v-col cols="11" class="text-center"
        ><v-btn
          x-large
          class="mb-8"
          color="primary"
          :disabled="!isUploadable"
          @click="upload"
          >投稿</v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";

@Component
export default class Register extends Vue {
  inputTag: string = "";
  inputTags: string[] = [];

  isExistImageFile: boolean = false;

  dialog: boolean = false;

  isUploadable: boolean = false;

  addTag() {
    if (this.inputTags.filter(tag => tag == "#" + this.inputTag).length == 0) {
      this.inputTags.push("#" + this.inputTag);
    }
    this.inputTag = "";
  }

  clear() {
    this.inputTags = [];
  }

  @Watch("inputTags")
  @Watch("isExistImageFile")
  checkInput() {
    this.isUploadable = this.inputTags.length > 0 && this.isExistImageFile;
  }

  upload() {}
}
</script>

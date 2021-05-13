<template>
  <v-container>
    <v-card dark>
      <v-card-text>
        <image-form
          :is-exist-image-file.sync="isExistImageFile"
          @captureImage="captureImage"
          @deleteImage="deleteImage"
        />
        <v-row>
          <v-col class="mt-5" cols="11">
            <v-btn color="primary white--text" @click="dialog = true"
              ><v-icon>mdi-plus</v-icon>TAG</v-btn
            >
            <v-btn color="white black--text" @click="clear">クリア</v-btn>
            <v-container class="d-flex flex-wrap justify-start" width="100vw">
              <v-chip
                class="mr-2 mt-2 white--text"
                color="primary"
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
        <v-textarea
          v-model="inputDescription"
          rows="2"
          outlined
          class="ma-2"
          label="説明(任意)"
        ></v-textarea>
      </v-card-text>
    </v-card>
    <br />
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
import ServiceFactory from "@/domains/factory/ServiceFactory";
import CardService from "@/domains/card/CardService";
import Card from "@/domains/card/Card";

@Component
export default class Register extends Vue {
  cardService!: CardService;

  inputTag: string = "";
  inputTags: string[] = [];
  inputDescription = "";
  extension: string = "";
  targetImageFile: string = "";
  isExistImageFile: boolean = false;
  dialog: boolean = false;
  isUploadable: boolean = false;

  async fetch() {
    this.cardService = await ServiceFactory.getCardService();
  }

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

  captureImage(file: string, extension: string) {
    this.targetImageFile = file;
    this.extension = extension;
  }
  deleteImage() {
    this.targetImageFile = "";
    this.extension = "";
  }

  upload() {
    this.cardService.uploadCard(
      new Card(
        "",
        this.targetImageFile,
        this.extension,
        this.inputTags,
        this.inputDescription,
        "",
        "testuser"
      )
    );
  }
}
</script>

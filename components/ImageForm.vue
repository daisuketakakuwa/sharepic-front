<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-file-input
          v-model="imageFile"
          prepend-icon="mdi-camera"
          label="画像"
          accept="image/png, image/PNG, image/jpg, image/jpeg, image/JPG, image/JPEG"
          @change="change"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-img :src="imageBase64URI" contain />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, PropSync } from "nuxt-property-decorator";

@Component
export default class ImageForm extends Vue {
  imageFile: File | null = null;
  imageBase64URI: string | ArrayBuffer | null = "";

  @PropSync("isExistImageFile", { type: Boolean, default: false })
  enableUploadImageFile!: boolean;

  async change(file: File) {
    if (file !== undefined && file !== null) {
      if (file.name.lastIndexOf(".") <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(file);
      // 読み込み処理(load)が完了するたびに実行されるイベント(関数)を登録
      fr.addEventListener("load", () => {
        // BASE64エンコード結果取得
        this.imageBase64URI = fr.result;
        this.enableUploadImageFile = true;
      });
    } else {
      this.imageBase64URI = "";
      this.imageFile = null;
    }
  }
}
</script>

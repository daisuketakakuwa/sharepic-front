<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-file-input
          v-model="imageFile"
          prepend-icon="mdi-camera"
          label="投稿する写真"
          accept="image/png, image/PNG, image/jpg, image/jpeg, image/JPG, image/JPEG"
        />
      </v-col>
      <v-col cols="12">
        <v-img
          id="uploadPicture"
          :width="pictureWidth"
          :height="pictureHeight"
          :src="imageBase64URI"
          contain
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, PropSync, Watch } from "nuxt-property-decorator";

@Component
export default class ImageForm extends Vue {
  imageFile: File | null = null;
  imageBase64URI: string | ArrayBuffer | null = "";

  @PropSync("isExistImageFile", { type: Boolean, default: false })
  enableUploadImageFile!: boolean;

  pictureWidth: number = 0;
  pictureHeight: number = 0;

  @Watch("imageFile")
  async change(file: File) {
    if (file !== undefined && file !== null) {
      if (file.name.lastIndexOf(".") <= 0) {
        return;
      }
      // 縦幅横幅取得
      const picElement: any = new Image();
      picElement.addEventListener("load", () => {
        console.log("縦幅：" + picElement.naturalHeight);
        console.log("横幅：" + picElement.naturalWidth);
        // 横長写真の場合、w:600 h:360  固定
        // 縦長写真の場合、w:600 h:1000 固定
        if (picElement.naturalHeight < picElement.naturalWidth) {
          this.pictureHeight = 360;
          this.pictureWidth = 360;
        } else {
          this.pictureHeight = 600;
          this.pictureWidth = 360;
        }
      });

      const fr = new FileReader();
      fr.readAsDataURL(file);
      // 読み込み処理(load)が完了するたびに実行されるイベント(関数)を登録
      fr.addEventListener("load", () => {
        // BASE64エンコード結果取得
        this.imageBase64URI = fr.result;
        this.enableUploadImageFile = true;
        // 縦幅横幅取得用に格納
        picElement.src = fr.result;
      });
    } else {
      this.pictureWidth = 0;
      this.pictureHeight = 0;
      this.imageBase64URI = "";
      this.imageFile = null;
    }
  }
}
</script>

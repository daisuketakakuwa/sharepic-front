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

        <div
          v-if="imageUploading"
          class="d-flex flex-wrap align-center  text-center"
        >
          <loading-spinner />
          <span>画像ファイルを圧縮中です......</span>
        </div>

        <div
          class="text-center"
          v-if="!imageUploading && !enableUploadImageFile"
        >
          ※こちらに写真が表示されます。
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, PropSync, Watch } from "nuxt-property-decorator";
import ImageUtils from "@/domains/image/ImageUtils";

@Component
export default class ImageForm extends Vue {
  imageFile: File | null = null;
  base64EncodedFile: any = "";
  extension: string = "";

  imageBase64URI: string | ArrayBuffer | null = "";

  @PropSync("isExistImageFile", { type: Boolean, default: false })
  enableUploadImageFile!: boolean;

  imageUploading = false;

  pictureWidth: number = 0;
  pictureHeight: number = 0;

  @Watch("imageFile")
  async change(file: File) {
    this.imageUploading = true;
    if (file !== undefined && file !== null) {
      if (file.name.lastIndexOf(".") <= 0) {
        return;
      }
      // 拡張子取得
      this.extension = file.name.substring(file.name.indexOf(".") + 1);
      // 縦幅横幅取得
      const picElement: any = new Image();
      picElement.addEventListener("load", () => {
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

      // プレビュー用の写真を読み込む
      const readerForPreview = new FileReader();
      readerForPreview.readAsDataURL(file);
      readerForPreview.addEventListener("load", () => {
        // BASE64エンコード結果取得
        this.imageBase64URI = readerForPreview.result;
        // 縦幅横幅取得用に格納
        picElement.src = readerForPreview.result;
      });

      // 画像ファイルを圧縮する
      const readerForUpload = new FileReader();
      const compFile = await ImageUtils.getCompressImageFileAsync(file);
      // 圧縮した画像ファイルを読み込む
      readerForUpload.readAsDataURL(compFile);
      // 読み込み処理(load)が完了するたびに実行されるイベント(関数)を登録
      readerForUpload.addEventListener("load", () => {
        // BASE64エンコード結果取得
        this.base64EncodedFile = readerForUpload.result
          ?.toString()
          .replace(/data:.*\/.*;base64,/, "");
        this.enableUploadImageFile = true;
        // emit
        this.$emit("captureImage", this.base64EncodedFile, this.extension);
      });
    } else {
      this.pictureWidth = 0;
      this.pictureHeight = 0;
      this.imageBase64URI = "";
      this.base64EncodedFile = "";
      this.extension = "";
      this.enableUploadImageFile = false;
      this.imageFile = null;
      // emit
      this.$emit("deleteImage");
    }
    this.imageUploading = false;
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-file-input
          v-model="imageFile"
          prepend-icon="mdi-camera"
          label="投稿する写真"
          accept="image/*"
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

  pictureWidth: number = 360;
  pictureHeight: number = 360;

  @Watch("imageFile")
  async change(file: File) {
    this.imageUploading = true;
    if (file !== undefined && file !== null) {
      if (file.name.lastIndexOf(".") <= 0) {
        return;
      }
      // 拡張子取得
      this.extension = file.name.substring(file.name.indexOf(".") + 1);

      // プレビュー用にURLを読み込む
      const url = URL.createObjectURL(file);
      console.log(url);
      this.imageBase64URI = url;

      // アップロード用にBASE64エンコード処理を行う
      const readerForPreview = new FileReader();
      const compFile = await ImageUtils.getCompressImageFileAsync(file);
      readerForPreview.readAsDataURL(compFile);
      readerForPreview.addEventListener("load", () => {
        const dataURI = readerForPreview.result?.toString();
        const index = dataURI?.indexOf(",") as number;
        this.base64EncodedFile = dataURI?.substring(index + 1);
        this.enableUploadImageFile = true;
        // emit
        this.$emit("captureImage", this.base64EncodedFile, this.extension);
      });
    } else {
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

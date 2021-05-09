<template>
  <v-dialog v-model="showDialog" :max-width="maxWidth" :persistent="persistent">
    <v-card>
      <v-toolbar class="text-h6" :color="headerColor" dark height="45px">
        {{ headerTitle }}
      </v-toolbar>
      <v-card-text class="ma-1">
        <v-checkbox v-model="addNewTag" label="新しいタグを追加する" />
        <v-select
          v-if="!addNewTag"
          :items="tags"
          v-model="inputExistTag"
          @input="checkInput"
          label="既存のタグを選択"
        />
        <v-text-field
          v-else
          v-model="inputNewTag"
          @change="checkInput"
          label="新しいタグを入力(30文字以内)"
        />
      </v-card-text>

      <v-card-actions class="pa-2">
        <v-spacer />
        <v-btn
          v-if="!hideOk"
          id="ok"
          :disabled="!activateOkBtn"
          :color="okColor"
          @click="ok"
          >{{ okTitle }}</v-btn
        >
        <v-btn v-if="!hideCancel" id="cancel" class="ml-2" @click="cancel">{{
          cancelTitle
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from "nuxt-property-decorator";
@Component
export default class TagFormDialog extends Vue {
  // TODO APIで一覧取得する
  tags: string[] = ["自然", "一眼", "TRAVEL"];
  addNewTag: boolean = false;
  activateOkBtn: boolean = false;

  inputNewTag: string = "";
  inputExistTag: string = "";

  @PropSync("inputTag", { type: String, default: "" })
  syncedInputTag!: string;

  @PropSync("dialog", { type: Boolean, default: false })
  showDialog!: boolean;

  @Prop({ type: String || Number, default: null })
  maxWidth!: string | number;

  @Prop({ type: String, default: "" })
  headerTitle!: string;

  @Prop({ type: String, default: "primary" })
  headerColor!: string;

  @Prop({ type: String, default: "OK" })
  okTitle!: string;

  @Prop({ type: String, default: "primary" })
  okColor!: string;

  @Prop({ type: Boolean, default: false })
  hideOk!: boolean;

  @Prop({ type: Boolean, default: true })
  hideOkEvent!: boolean;

  @Prop({ type: String, default: "キャンセル" })
  cancelTitle!: string;

  @Prop({ type: Boolean, default: false })
  hideCancel!: boolean;

  @Prop({ type: Boolean, default: true })
  hideCancelEvent!: boolean;

  @Prop({ type: Boolean, default: false })
  persistent!: boolean;

  @Watch("addNewTag")
  checkInput() {
    let checkTarget = "";
    if (this.addNewTag) {
      checkTarget = this.inputNewTag;
    } else {
      checkTarget = this.inputExistTag;
    }

    if (checkTarget.length > 0 && checkTarget.length <= 30) {
      this.activateOkBtn = true;
      this.syncedInputTag = checkTarget;
    } else {
      this.activateOkBtn = false;
    }
  }

  ok() {
    if (this.hideOkEvent) {
      this.showDialog = false;
    }
    this.inputNewTag = "";
    this.inputExistTag = "";
    this.$emit("ok");
  }

  cancel() {
    if (this.hideCancelEvent) {
      this.showDialog = false;
    }
    this.syncedInputTag = "";
    this.addNewTag = false;
    this.activateOkBtn = false;
    this.$emit("cancel");
  }
}
</script>

<template>
  <v-container v-if="syncedShowRegisterForm">
    <v-row>
      <v-col class="mt-5" cols="12"
        ><v-text-field
          v-model="username"
          label="USERNAME(6文字～30文字)"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"
        ><v-text-field
          v-model="password"
          label="PASSWORD(6文字～30文字)"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"
        ><v-text-field
          v-model="passwordForCheck"
          label="PASSWORD(再確認用)"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn
          x-large
          color="primary"
          :disabled="!activateBtn"
          @click="register"
          >新規登録</v-btn
        >
      </v-col>
    </v-row>
    <app-dialog
      :dialog.sync="registerDialog"
      :max-width="new String(750)"
      :hide-cancel="registerResult"
      :hide-ok="!registerResult"
      @ok="home"
      ok-title="閉じる"
      header-title="通知"
    >
      {{ dialogMessage }}
    </app-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from "nuxt-property-decorator";
import User from "@/domains/user/User";
import ServiceFactory from "@/domains/factory/ServiceFactory";
import AuthService from "@/domains/auth/AuthService";

@Component
export default class RegisterForm extends Vue {
  authService!: AuthService;

  @PropSync("showRegisterForm", { type: Boolean, default: false })
  syncedShowRegisterForm!: boolean;

  activateBtn = false;
  registerDialog = false;
  registerResult = false;

  dialogMessage = "";

  username = "";
  password = "";
  passwordForCheck = "";

  async fetch() {
    this.authService = await ServiceFactory.getAuthService();
  }

  async register() {
    const result = await this.authService.register(
      new User(this.username, this.password)
    );
    this.registerDialog = true;
    if (!result) {
      this.dialogMessage = "アカウント登録に成功しました。";
      this.registerResult = true;
    } else {
      this.dialogMessage = result;
      this.registerResult = false;
      this.username = "";
      this.password = "";
      this.passwordForCheck = "";
    }
  }

  home() {
    this.$router.push("/auth/home");
  }

  @Watch("username")
  @Watch("password")
  @Watch("passwordForCheck")
  checkInput() {
    const usernameOk: boolean =
      this.username.length >= 6 && this.username.length <= 30;
    const passwordOk: boolean =
      this.password.length >= 6 && this.password.length <= 30;
    const passwordDoubleCheckOk: boolean =
      this.password === this.passwordForCheck;

    if (usernameOk && passwordOk && passwordDoubleCheckOk) {
      this.activateBtn = true;
    } else {
      this.activateBtn = false;
    }
  }
}
</script>

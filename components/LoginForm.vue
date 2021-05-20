<template>
  <v-container v-if="syncedShowLoginForm">
    <v-row>
      <v-col class="mt-5" cols="12"
        ><v-text-field v-model="username" label="USERNAME" outlined />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"
        ><v-text-field v-model="password" label="PASSWORD" outlined />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn x-large color="primary" @click="login" :disabled="!activateBtn"
          >ログイン</v-btn
        >
      </v-col>
    </v-row>
    <app-dialog
      :dialog.sync="loginFailedDialog"
      :max-width="new String(750)"
      :hide-cancel="true"
      ok-title="閉じる"
      header-title="ログイン結果"
    >
      ログイン処理に失敗しました。
    </app-dialog>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, PropSync, Watch } from "nuxt-property-decorator";
import User from "@/domains/user/User";
import ServiceFactory from "@/domains/factory/ServiceFactory";
import AuthService from "@/domains/auth/AuthService";

@Component
export default class LoginForm extends Vue {
  authService!: AuthService;

  @PropSync("showLoginForm", { type: Boolean, default: false })
  syncedShowLoginForm!: boolean;

  activateBtn = false;

  showDialog = false;

  username = "";
  password = "";

  loginFailedDialog = false;

  async fetch() {
    this.authService = await ServiceFactory.getAuthService();
  }

  async login() {
    const result = await this.authService.login(
      new User(this.username, this.password)
    );
    if (result) {
      this.$router.push("/auth/home");
    } else {
      this.loginFailedDialog = true;
      this.username = "";
      this.password = "";
    }
  }

  @Watch("username")
  @Watch("password")
  checkInput() {
    if (this.username && this.password) {
      this.activateBtn = true;
    } else {
      this.activateBtn = false;
    }
  }
}
</script>

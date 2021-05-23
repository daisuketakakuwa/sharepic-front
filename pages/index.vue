<template>
  <v-container>
    <v-tabs>
      <v-tabs-slider color="primary" />
      <v-tab @click="switchLogin('login')"
        ><span class="font">ログイン</span></v-tab
      >
      <v-tab @click="switchRegister('register')"
        ><span class="font">新規登録</span></v-tab
      >
    </v-tabs>
    <register-form :show-register-form="registerTab" />
    <login-form :show-login-form="loginTab" />
  </v-container>
</template>

<script lang="ts">
import axios from "@/domains/factory/AxiosFactory";
import { Component, Vue } from "nuxt-property-decorator";
import UniversalCookie from "universal-cookie";

@Component
export default class Index extends Vue {
  registerTab: boolean = false;
  loginTab: boolean = false;

  fetch() {
    this.loginTab = true;
  }

  mounted() {
    // ブラウザにCookie(JWTトークン)がある場合、画面遷移する
    const cookie = new UniversalCookie();
    const token = cookie.get("token");
    if (token) {
      axios.defaults.headers.common.Authorization = token;
      this.$router.push("/auth/home");
    }
  }

  switchLogin() {
    this.loginTab = true;
    this.registerTab = false;
  }

  switchRegister() {
    this.registerTab = true;
    this.loginTab = false;
  }
}
</script>

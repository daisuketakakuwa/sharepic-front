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
    <v-container v-if="registerTab">
      <v-row>
        <v-col class="mt-5" cols="12"
          ><v-text-field label="USERNAME" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"><v-text-field label="PASSWORD" outlined /> </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"
          ><v-text-field label="PASSWORD(再確認)" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn x-large color="primary">新規登録</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="loginTab">
      <v-row>
        <v-col class="mt-5" cols="12"
          ><v-text-field label="USERNAME" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"><v-text-field label="PASSWORD" outlined /> </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn x-large color="primary" @click="login">ログイン</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  registerTab: boolean = false;
  loginTab: boolean = false;

  fetch() {
    this.loginTab = true;
  }

  switchLogin() {
    this.loginTab = true;
    this.registerTab = false;
  }

  switchRegister() {
    this.registerTab = true;
    this.loginTab = false;
  }

  login() {
    this.$router.push("/auth/home");
  }
}
</script>

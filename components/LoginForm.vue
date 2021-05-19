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
    <app-dialog :dialog="showDialog">
      {{ dialogMessage }}
    </app-dialog>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, PropSync, Watch } from "nuxt-property-decorator";

@Component
export default class LoginForm extends Vue {
  @PropSync("showLoginForm", { type: Boolean, default: false })
  syncedShowLoginForm!: boolean;

  activateBtn = false;

  showDialog = false;
  dialogMessage = "";

  username = "";
  password = "";

  login() {
    this.$router.push("/auth/home");
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

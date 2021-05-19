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
    <app-dialog :dialog="showDialog">
      {{ dialogMessage }}
    </app-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from "nuxt-property-decorator";

@Component
export default class RegisterForm extends Vue {
  @PropSync("showRegisterForm", { type: Boolean, default: false })
  syncedShowRegisterForm!: boolean;

  activateBtn = false;

  showDialog = false;
  dialogMessage = "";

  username = "";
  password = "";
  passwordForCheck = "";

  register() {
    this.showDialog = true;
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

    console.log(usernameOk);
    console.log(passwordOk);
    console.log(passwordDoubleCheckOk);

    if (usernameOk && passwordOk && passwordDoubleCheckOk) {
      this.activateBtn = true;
    } else {
      this.activateBtn = false;
    }
  }
}
</script>

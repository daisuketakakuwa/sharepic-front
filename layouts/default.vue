<template>
  <v-app>
    <v-app-bar
      app
      absolute
      elevate-on-scroll
      class="black white--text"
      height="50px"
    >
      <v-container>
        <v-row>
          <v-col cols="6">
            <h1 class="font header">
              SHAREPIC
            </h1>
          </v-col>
          <v-col v-if="loggedIn" cols="6">
            <h3 class="font ml-16">
              <v-btn color="black" class="white--text mb-2" @click="logout"
                >LOGOUT</v-btn
              >
            </h3>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <nuxt />
      <navigate-menu :show-navigate-menu="loggedIn" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import axios from "@/domains/factory/AxiosFactory";
import UniversalCookie from "universal-cookie";

@Component
export default class Default extends Vue {
  loggedIn: boolean = false;

  logout() {
    this.loggedIn = false;
    // トークンを空にする
    axios.defaults.headers.common.Authorization = "";
    // Cookieを削除
    const cookie = new UniversalCookie();
    cookie.remove("token");
    this.$router.push("/");
  }

  @Watch("$route")
  changedRoute() {
    this.loggedIn = this.$route.path.startsWith("/auth/");
  }
}
</script>

<style scoped>
.font {
  font-family: Bradley Hand ITC;
}

.header {
  font-size: 30px;
}

.logout {
  font-size: 15px;
}
</style>

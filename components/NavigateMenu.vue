<template>
  <v-bottom-navigation v-if="showMenu" app grow>
    <v-btn
      active-class="blue-grey lighten-5"
      :to="item.to"
      v-for="item in items"
      :key="item.to"
      @click="goto(item.to)"
    >
      <v-icon>
        {{ item.icon }}
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from "nuxt-property-decorator";

@Component
export default class NavagateMenu extends Vue {
  @PropSync("showNavigateMenu", { type: Boolean, default: false })
  showMenu!: boolean;

  items = [
    { icon: "mdi-home", to: "/auth/home" },
    {
      icon: "mdi-card-search",
      to: "/auth/_tag"
    },
    { icon: "mdi-plus-box-outline", to: "/auth/register" },
    { icon: "mdi-account", to: "/auth/account" }
  ];

  goto(path: string) {
    this.$router.push(path);
  }
}
</script>

<template>
  <v-app>
    <v-app-bar color="black" fixed app>
      <nuxt-link to="/">
        <AppLogo width="64px" />
      </nuxt-link>
      <nuxt-link to="/" tag="div" style="cursor: pointer" class="mx-3">
        <v-toolbar-title class="white--text text-h4">
          jMS Status
        </v-toolbar-title>
      </nuxt-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DefaultLayout',
})
</script>

<template>
  <v-app>
    <v-app-bar color="gray" fixed app>
      <nuxt-link to="/">
        <AppLogo width="64px" />
      </nuxt-link>
      <nuxt-link to="/" tag="div" style="cursor: pointer" class="mx-3">
        <v-toolbar-title class="text-h4">jMS Status</v-toolbar-title>
      </nuxt-link>
      <v-spacer />
      <v-btn icon elevation="3" class="mx-1" @click="fetchStatuses()">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DefaultLayout',
  methods: {
    fetchStatuses() {
      this.$nuxt.$emit('fetch-statuses')
    },
  },
})
</script>

<template>
  <v-container fluid>
    <ServicesContainer />
    <TipsContainer />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ServicesContainer from '../components/ServicesContainer.vue'
import TipsContainer from '../components/TipsContainer.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    ServicesContainer,
    TipsContainer,
  },
})
</script>

<template>
  <v-container fluid>
    <p>
      jao Minecraft Server
      および関連するサービスのステータス状態を表示しています。
      <br />
      各サーバへの過負荷防止のため、10分間の結果キャッシュを行っています。
    </p>
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

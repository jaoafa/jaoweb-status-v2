<template>
  <v-container fluid>
    <v-card v-for="tip of tips" :key="tip.title" class="my-1">
      <v-card-title v-text="tip.title" />
      <v-card-subtitle v-text="tip.subtitle" />
      <v-card-text style="white-space: pre-wrap" v-text="tip.text" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

interface Tip {
  title: string
  subtitle: string
  text: string
}

export default Vue.extend({
  name: 'TipsContainerComponent',
  data(): {
    tips: Tip[]
  } {
    return {
      tips: [
        {
          title: '注意事項',
          subtitle: '利用される際は、次の事項に注意してください。',
          text: 'Text',
        },
      ],
    }
  },
})
</script>

<template>
  <v-container fluid>
    <v-card v-for="tip of tips" :key="tip.title" class="my-1">
      <v-card-title v-text="tip.title" />
      <v-card-subtitle v-text="tip.subtitle" />
      <v-card-text
        v-if="tip.text !== undefined"
        style="white-space: pre-wrap"
        v-text="tip.text"
      />
      <v-card-text v-if="tip.texts !== undefined">
        <ul>
          <li v-for="text in tip.texts" :key="text" v-text="text" />
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

interface Tip {
  title: string
  subtitle: string
  text?: string
  texts?: string[]
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
          texts: [
            'このページで提供する情報・データについての正確性、完全性、確実性、可用性等について一切の責任を負わず、エラー、バグ、不具合その他の瑕疵がないこと、コンピューターウイルス等の有害情報・データが含まれないことを一切保証しません。',
            'jao Minecraft Server 運営は利用者が本サービスを利用したことによって利用者に生じた損害または損失について、一切の責任を負いません。',
          ],
        },
      ],
    }
  },
})
</script>

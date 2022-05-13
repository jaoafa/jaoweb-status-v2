<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="service in services"
        :key="service.sid"
        :md="service.flex"
        cols="12"
      >
        <status-container
          :service="service"
          :helps="helps"
          :statuses="statuses"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import StatusContainer, {
  Service,
  Help,
  Status,
} from '../components/StatusContainer.vue'

export default Vue.extend({
  name: 'ServicesContainerComponent',
  components: { StatusContainer },
  data(): {
    services: Service[]
    helps: Help[]
    statuses: Status[]
  } {
    return {
      services: [
        {
          sid: 'jms-web',
          icon: 'mdi-web',
          name: 'jaoafa.com',
          tags: ['Web'],
          websiteUrl: 'https://jaoafa.com',
          reportUrl: 'https://github.com/jaoafa/jaoweb/issues/new/choose',
          flex: 6,
        },
        {
          sid: 'jms-minecraft',
          icon: 'mdi-minecraft',
          name: 'play.jaoafa.com',
          tags: ['Minecraft'],
          websiteUrl: null,
          reportUrl: null,
          flex: 6,
        },
        {
          sid: 'jms-gamers-club',
          icon: 'mdi-discord',
          name: 'jMS Gamers Club',
          tags: ['Discord'],
          websiteUrl: null,
          reportUrl: null,
          flex: 4,
        },
        {
          sid: 'discord-javajaotan2',
          icon: 'mdi-robot',
          name: 'Javajaotan2',
          tags: ['Discord', 'Bot'],
          websiteUrl: 'https://github.com/jaoafa/Javajaotan2',
          reportUrl: 'https://github.com/jaoafa/Javajaotan2/issues/new/choose',
          flex: 4,
        },
        {
          sid: 'discord-jda-vcspeaker',
          icon: 'mdi-account-voice',
          name: 'JDA-VCSpeaker',
          tags: ['Discord', 'Bot'],
          websiteUrl: 'https://github.com/jaoafa/JDA-VCSpeaker',
          reportUrl:
            'https://github.com/jaoafa/JDA-VCSpeaker/issues/new/choose',
          flex: 4,
        },
        {
          sid: 'server-jaomain',
          icon: 'mdi-server',
          name: 'jaoMain',
          tags: ['Server'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'server-zakurohat',
          icon: 'mdi-server',
          name: 'ZakuroHat',
          tags: ['Server'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'jaomain-zakurohat',
          icon: 'mdi-database',
          name: 'jaoMainDB',
          tags: ['Database'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'database-zakurohat',
          icon: 'mdi-database',
          name: 'ZakuroHatDB',
          tags: ['Database'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'mojang-minecraftservices',
          icon: 'mdi-minecraft',
          name: 'minecraftservices.com',
          tags: ['Minecraft', 'Mojang Server'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'mojang-mojangcom',
          icon: 'mdi-minecraft',
          name: 'mojang.com',
          tags: ['Minecraft', 'Mojang Server'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'mojang-minecraftnet',
          icon: 'mdi-minecraft',
          name: 'minecraft.net',
          tags: ['Minecraft', 'Mojang Server'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'mojang-minecraft-skins',
          icon: 'mdi-minecraft',
          name: 'AWS MinecraftSkins',
          tags: ['Minecraft', 'Mojang Server'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'jms-web-users',
          icon: 'mdi-account-details-outline',
          name: 'users.jaoafa.com',
          tags: ['Web'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'jms-web-api',
          icon: 'mdi-api',
          name: 'api.jaoafa.com',
          tags: ['Web', 'Backend'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'jms-web-map',
          icon: 'mdi-map',
          name: 'map.jaoafa.com',
          tags: ['Web'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
        {
          sid: 'jms-web-wiki',
          icon: 'mdi-book-multiple-outline',
          name: 'wiki.jaoafa.com',
          tags: ['Web'],
          websiteUrl: null,
          reportUrl: null,
          flex: 3,
        },
      ],
      statuses: [
        {
          sid: 'jms-web',
          description: '障害は発生しておりません。',
          detailUrl: null,
          datetime: '2022-01-01 00:00:00',
          status: 'green',
          loading: false,
        },
        {
          sid: 'jms-minecraft',
          description: '障害は発生しておりません。',
          detailUrl: 'https://play.jaoafa.com/status',
          datetime: '2022-01-01 00:00:00',
          status: 'green',
          loading: false,
        },
        {
          sid: 'jms-gamers-club',
          description: '障害は発生しておりません。',
          detailUrl: 'https://jaoafa.com/status',
          datetime: '2022-01-01 00:00:00',
          status: 'green',
          loading: false,
        },
      ],
      helps: [
        {
          sid: 'jms-gamers-club',
          title: 'test',
          subtitle: 'test',
          text: 'test',
        },
      ],
    }
  },
  methods: {
    isLoading(service: Service): boolean {
      const match = this.statuses.find((status) => status.sid === service.sid)
      if (!match) {
        return false
      }
      return match.loading
    },
    getStatusValue(service: Service, key: keyof Status): any {
      const match = this.statuses.find((status) => status.sid === service.sid)
      if (!match) {
        return ''
      }
      return match[key]
    },
  },
})
</script>

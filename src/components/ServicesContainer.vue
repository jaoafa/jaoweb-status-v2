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
import axios from 'axios'
import StatusContainer from '../components/StatusContainer.vue'
import Help from '~/api/models/help'
import Service from '~/api/models/service'
import Status from '~/api/models/status'
import { HELPS, SERVICES } from '~/api/constants'

export default Vue.extend({
  name: 'ServicesContainerComponent',
  components: { StatusContainer },
  data(): {
    services: Service[]
    helps: Help[]
    statuses: Status[]
  } {
    return {
      services: SERVICES,
      helps: HELPS,
      statuses: [],
    }
  },
  mounted() {
    this.fetchStatuses()

    this.$nuxt.$on('fetch-statuses', this.fetchStatuses)
  },
  methods: {
    fetchStatuses() {
      this.statuses = []

      for (const service of this.services) {
        console.log('fetchStatuses', service.sid)
        axios
          .get(`/api/status/${service.sid}?${new Date().getTime()}`)
          .then((response) => {
            this.statuses = this.statuses.filter(
              (status) => status.sid !== service.sid
            )
            const status = response.data
            this.statuses.push(status)
          })
          .catch((error) => {
            console.error(error)

            this.statuses = this.statuses.filter(
              (status) => status.sid !== service.sid
            )
            this.statuses.push({
              sid: service.sid,
              description: 'ステータス情報の取得中にエラーが発生しました。',
              detailUrl: null,
              datetime: this.formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss'),
              status: 'purple',
              loading: false,
            })
          })
      }
    },
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
    formatDate(date: Date, format: string): string {
      format = format.replace(/yyyy/g, String(date.getFullYear()))
      format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
      format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
      format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
      format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
      format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
      format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
      return format
    },
  },
})
</script>

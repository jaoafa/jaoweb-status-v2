<template>
  <div class="status" style="height: 100%">
    <v-card
      height="100%"
      max-width="100%"
      class="d-flex flex-column"
      :loading="isLoading(service)"
    >
      <v-card-title class="d-flex justify-start py-3">
        <v-badge dot :color="getStatusValue(service, 'status')">
          <v-icon>{{ service.icon }}</v-icon>
        </v-badge>
        <span
          class="status-circle rounded-circle"
          :data-color="getStatusValue(service, 'status')"
        />
        <span class="ml-3" v-text="service.name" />
        <v-spacer />
        <v-btn
          v-if="isExistsHelp(service)"
          class="mx-1"
          elevation="3"
          icon
          small
          @click="dialog = true"
        >
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-0">
        <v-chip
          v-for="tag in service.tags"
          :key="tag"
          small
          class="mr-1"
          v-text="tag"
        />
      </v-card-text>

      <v-card-text
        v-if="getStatusValue(service, 'description') != ''"
        class="py-1 align-start"
        style="white-space: pre-wrap"
        v-text="getStatusValue(service, 'description')"
      />
      <v-card-text v-else>読み込み中...</v-card-text>

      <v-spacer />

      <v-card-actions>
        <v-tooltip v-if="getStatusValue(service, 'detailUrl') != ''" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              class="mx-1"
              elevation="3"
              icon
              v-bind="attrs"
              :href="getStatusValue(service, 'detailUrl')"
              v-on="on"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>詳細情報</span>
        </v-tooltip>

        <v-tooltip v-if="service.reportUrl !== null" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              class="mx-1"
              elevation="3"
              icon
              v-bind="attrs"
              :href="service.reportUrl"
              v-on="on"
            >
              <v-icon>mdi-forum-outline</v-icon>
            </v-btn>
          </template>
          <span>要望・報告</span>
        </v-tooltip>

        <v-tooltip v-if="service.websiteUrl !== null" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              class="mx-1"
              elevation="3"
              icon
              v-bind="attrs"
              :href="service.websiteUrl"
              v-on="on"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>関連ページ</span>
        </v-tooltip>

        <v-spacer />
        <div>{{ getStatusValue(service, 'datetime') }}</div>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card
          v-for="help of getHelps(service)"
          :key="help.title"
          class="my-1"
        >
          <v-card-title v-text="help.title" />
          <v-card-subtitle v-text="help.subtitle" />
          <v-card-text v-text="help.text" />
        </v-card>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export type ServiceId = string

export interface Service {
  sid: ServiceId
  icon: string
  name: string
  tags: string[]
  websiteUrl: string | null
  reportUrl: string | null
  flex: number
}

export interface Help {
  sid: ServiceId
  title: string
  subtitle: string
  text: string
}

export interface Status {
  sid: ServiceId
  description: string
  detailUrl: string | null
  datetime: string
  status: string
  loading: boolean
}

export default Vue.extend({
  name: 'StatusContainerComponent',
  props: {
    service: {
      type: Object as () => Service,
      required: true,
    },
    helps: {
      type: Array as () => Help[],
      required: true,
    },
    statuses: {
      type: Array as () => Status[],
      required: true,
    },
  },
  data(): {
    dialog: boolean
  } {
    return {
      dialog: false,
    }
  },
  methods: {
    isLoading(service: Service): boolean {
      const match = this.statuses.find((status) => status.sid === service.sid)
      if (!match) {
        return true
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
    isExistsHelp(service: Service): boolean {
      return this.helps.some((help) => help.sid === service.sid)
    },
    getHelps(service: Service): Help[] {
      return this.helps.filter((help) => help.sid === service.sid)
    },
  },
})
</script>

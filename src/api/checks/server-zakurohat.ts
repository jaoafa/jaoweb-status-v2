import axios from 'axios'
import loadConfig from '../lib/loadConfig'
import { BaseCheck, CheckResponse } from './base'

export default class CheckServerZakuroHat extends BaseCheck {
  async execute(): Promise<CheckResponse> {
    const config = loadConfig()
    const hostId = config.checks.zakurohat.mackerel.hostId
    const monitorId = config.checks.zakurohat.mackerel.monitorId

    const response = await axios.get(
      `https://api.mackerelio.com/api/v0/hosts/${hostId}/monitored-statuses`,
      {
        headers: {
          'X-Api-Key': config.mackerel.apiKey,
        },
        validateStatus: () => true,
      }
    )
    if (response.status !== 200) {
      return {
        status: 'yellow',
        message: '状態を取得できませんでした。(RESPONSE)',
      }
    }
    const monitoredStatuses = response.data.monitoredStatuses
    const monitor = monitoredStatuses.find(
      (monitoredStatus: {
        monitorId: string
        status: string
        detail?: string
      }) => monitoredStatus.monitorId === monitorId
    )
    if (!monitor) {
      return {
        status: 'yellow',
        message: '状態を取得できませんでした。(MONITOR)',
      }
    }
    const status = monitor.status
    if (status === 'OK') {
      return {
        status: 'green',
        message: null,
      }
    }

    return {
      status: 'red',
      message: `サーバの死活監視で異常が発生しています。障害が発生している恐れがあります。`,
    }
  }
}

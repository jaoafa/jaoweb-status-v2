import axios from 'axios'
import { BaseCheck, CheckResponse } from './base'

export default class CheckjMSDiscord extends BaseCheck {
  async execute(): Promise<CheckResponse> {
    const response = await axios.get(
      'https://srhpyqt94yxb.statuspage.io/api/v2/summary.json',
      {
        validateStatus: () => true,
      }
    )
    if (response.status !== 200) {
      return {
        status: 'yellow',
        message: 'Discordのステータスを取得できませんでした。',
      }
    }
    const data = response.data
    const errors: {
      name: string
      status: string
      impact: string
      shortlink: string
      updatedAt: Date
    }[] = []

    for (const incident of data.incidents) {
      const name = incident.name
      const status = incident.status
      const impact = incident.impact
      const shortlink = incident.shortlink
      const updatedAt = new Date(incident.updated_at)

      if (status === 'resolved') {
        continue
      }

      errors.push({
        name,
        status,
        impact,
        shortlink,
        updatedAt,
      })
    }

    const isCritical = errors.some((error) => error.impact === 'critical')

    if (errors.length === 0) {
      return {
        status: 'green',
        message: null,
      }
    }

    return {
      status: isCritical ? 'red' : 'yellow',
      message:
        `${errors.length}個のインシデント情報があります。` +
        (isCritical
          ? '\n致命的なインシデントが発生しているため、利用できない可能性があります。'
          : ''),
    }
  }
}

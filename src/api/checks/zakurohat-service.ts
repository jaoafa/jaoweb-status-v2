import axios from 'axios'
import loadConfig from '../lib/loadConfig'
import { BaseCheck, CheckResponse } from './base'

export default class CheckZakuroHatService extends BaseCheck {
  service: string

  constructor(service: string) {
    super()
    this.service = service
  }

  async execute(): Promise<CheckResponse> {
    try {
      const config = loadConfig()
      const url = config.checks.zakurohat.service.url
      const response = await axios.get(url, {
        params: {
          service: this.service,
        },
        validateStatus: () => true,
      })
      if (response.status !== 200) {
        return {
          status: 'yellow',
          message: 'ステータス確認処理に失敗しました。',
        }
      }
      if (response.data.status) {
        return {
          status: 'green',
          message: null,
        }
      }
      return {
        status: 'red',
        message: `アプリケーションが停止しています。関連する機能が利用できない可能性があります。`,
      }
    } catch (e) {
      console.error(e)
      return {
        status: 'red',
        message: `接続できませんでした。障害が発生している恐れがあります。`,
      }
    }
  }
}

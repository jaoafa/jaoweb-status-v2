import axios from 'axios'
import { BaseCheck, CheckResponse } from './base'

export default class CheckRequestHead extends BaseCheck {
  address: string[]

  constructor(...address: string[]) {
    super()
    this.address = address
  }

  async execute(): Promise<CheckResponse> {
    for (const address of this.address) {
      try {
        const response = await axios.head(`https://${address}`, {
          validateStatus: () => true,
        })
        if (response.status !== 200) {
          return {
            status: 'red',
            message: `接続できませんでした。障害が発生している恐れがあります。(${address} / ${response.status})`,
          }
        }
      } catch (e) {
        console.error(e)
        return {
          status: 'red',
          message: `接続できませんでした。障害が発生している恐れがあります。\n(${address} / ${
            (e as any).message
          })`,
        }
      }
    }
    return {
      status: 'green',
      message: null,
    }
  }
}

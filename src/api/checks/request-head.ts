import axios from 'axios'
import { BaseCheck, CheckResponse } from './base'

export default class CheckRequestHead extends BaseCheck {
  address: string

  constructor(address: string) {
    super()
    this.address = address
  }

  async execute(): Promise<CheckResponse> {
    try {
      const response = await axios.head(`https://${this.address}`, {
        validateStatus: () => true,
      })
      if (response.status === 200) {
        return {
          status: 'green',
          message: null,
        }
      }
      return {
        status: 'red',
        message: `接続できませんでした。障害が発生している恐れがあります。(${response.status})`,
      }
    } catch (e) {
      console.error(e)
      return {
        status: 'red',
        message: `接続できませんでした。障害が発生している恐れがあります。\n(${
          (e as any).message
        })`,
      }
    }
  }
}

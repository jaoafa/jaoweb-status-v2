import { sys } from 'ping'
import { BaseCheck, CheckResponse } from './base'

export default class CheckPingServer extends BaseCheck {
  address: string

  constructor(address: string) {
    super()
    this.address = address
  }

  execute(): Promise<CheckResponse> {
    return new Promise<CheckResponse>((resolve) => {
      sys.probe(this.address, (isAlive) => {
        if (isAlive) {
          resolve({
            status: 'green',
            message: null,
          })
        }
        resolve({
          status: 'red',
          message: `接続できませんでした。障害が発生している恐れがあります。(PING)`,
        })
      })
    })
  }
}

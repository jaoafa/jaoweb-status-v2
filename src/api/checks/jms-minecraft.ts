import isPortReachable from '../lib/is-port-reachable'
import { BaseCheck, CheckResponse } from './base'

export default class CheckjMSMinecraft extends BaseCheck {
  async execute(): Promise<CheckResponse> {
    if (!(await isPortReachable('play.jaoafa.com', 25565))) {
      return {
        status: 'red',
        message: `接続できませんでした。障害が発生している恐れがあります。(PORT)`,
      }
    }
    return {
      status: 'green',
      message: null,
    }

    // TODO: RCON
  }
}

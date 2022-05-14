import { createConnection } from 'mysql2/promise'
import loadConfig from '../lib/loadConfig'
import { BaseCheck, CheckResponse } from './base'

export default class DatabaseZakuroHat extends BaseCheck {
  async execute(): Promise<CheckResponse> {
    const config = loadConfig()

    try {
      const connection = await createConnection({
        host: config.checks.zakurohat.db.host,
        port: config.checks.zakurohat.db.port,
        user: config.checks.zakurohat.db.user,
        password: config.checks.zakurohat.db.password,
        timezone: '+09:00',
      })
      await connection.beginTransaction()
      await connection.end()
      connection.destroy()
    } catch (e) {
      console.error(e)
      return {
        status: 'red',
        message: `接続できませんでした。障害が発生している恐れがあります。`,
      }
    }

    return {
      status: 'green',
      message: null,
    }
  }
}

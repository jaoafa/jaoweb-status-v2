import { createConnection } from 'mysql2/promise'
import loadConfig from '../lib/loadConfig'
import { BaseCheck, CheckResponse } from './base'

/**
 * jaoMainDB ステータスチェック
 *
 * jaoMainDBにログイン試行し、正常にログインできるかを確認する。
 */
export default class DatabasejaoMain extends BaseCheck {
  async execute(): Promise<CheckResponse> {
    const config = loadConfig()

    try {
      const connection = await createConnection({
        host: config.checks.jaomain.db.host,
        port: config.checks.jaomain.db.port,
        user: config.checks.jaomain.db.user,
        password: config.checks.jaomain.db.password,
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

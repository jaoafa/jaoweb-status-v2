import { Express, Request, Response } from 'express'
import DB from '~/api/lib/db'
import EndPoint from '~/api/lib/EndPoint'
import loadConfig from '~/api/lib/loadConfig'
import omit from '~/api/lib/omit'
import CustomStatus, { ResponseCustomStatus } from '~/api/models/customStatus'

/**
 * GET /api/custom
 *
 * カスタムステータスの取得（過去も含む）
 * （`register_ip` はレスポンスから除外する）
 */
export default class GetAdminCustomEndPoint extends EndPoint {
  constructor(app: Express) {
    super(app, 'get', '/custom')
  }

  async handle(_req: Request, res: Response): Promise<void> {
    const config = loadConfig()
    const db = new DB(config.api.dbPath)
    const rows = (await db.all(
      'SELECT * FROM custom_statuses',
      []
    )) as CustomStatus[]
    const results: ResponseCustomStatus[] = rows.map((row) => {
      return omit(row, 'register_ip') as ResponseCustomStatus
    })
    res.json(results)
    await db.close()
  }
}

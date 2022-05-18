import { Express, Request, Response } from 'express'
import DB from '~/api/lib/db'
import EndPoint from '~/api/lib/EndPoint'
import getIp from '~/api/lib/get-ip'
import loadConfig from '~/api/lib/loadConfig'
import validateCustomStatus from '~/api/lib/validations/custom-status'
import { PostCustomStatus } from '~/api/models/customStatus'

/**
 * POST /custom
 *
 * カスタムステータスの登録
 */
export default class PostAdminCustomEndPoint extends EndPoint {
  constructor(app: Express) {
    super(app, 'post', '/custom')
  }

  async handle(req: Request, res: Response): Promise<void> {
    const config = loadConfig()

    // トークン認証
    if (
      req.headers.authorization === undefined ||
      req.headers.authorization !== `Bearer ${config.api.token}`
    ) {
      res.status(401).json({
        message: '認証が必要',
      })
      return
    }

    const db = new DB(config.api.dbPath)
    const {
      sid,
      title,
      text,
      detailUrl,
      status,
      started_at: startedAt,
      ended_at: endedAt,
    } = req.body as PostCustomStatus

    // 同一タイトル・対象への既存登録がある場合に弾く
    if (await isExists(db, sid, title, startedAt)) {
      res.status(409).json({
        message:
          'サービスID・タイトル・開始日時にマッチするカスタムステータスが既に存在',
      })
      await db.close()
      return
    }

    // バリデーション
    if (!(await validateCustomStatus(db, null, res, req.body))) {
      return
    }

    // 登録
    const registerIp = getIp(req)
    await db.run(
      'INSERT INTO custom_statuses (sid, title, text, detailUrl, status, register_ip, started_at, ended_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [sid, title, text, detailUrl, status, registerIp, startedAt, endedAt]
    )
    res.status(201).end()
    await db.close()
  }
}
async function isExists(db: DB, sid: string, title: string, startedAt: string) {
  const row = await db.get(
    'SELECT * FROM custom_statuses WHERE sid = ? AND title = ? AND started_at = ?',
    [sid, title, startedAt]
  )
  return row !== undefined
}

import { Express, Request, Response } from 'express'
import DB from '~/api/lib/db'
import EndPoint from '~/api/lib/EndPoint'
import loadConfig from '~/api/lib/loadConfig'
import CustomStatus from '~/api/models/customStatus'

/**
 * DELETE /api/custom/:cid
 *
 * カスタムステータスの削除
 * （終了したものも残すため、原則行わない）
 */
export default class DeleteAdminCustomEndPoint extends EndPoint {
  constructor(app: Express) {
    super(app, 'delete', '/custom/:cid')
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

    const { cid } = req.params

    // 現在の情報を取得
    const row = (await db.get('SELECT * FROM custom_statuses WHERE cid = ?', [
      cid,
    ])) as CustomStatus
    if (row === undefined) {
      res.status(404).json({
        message: '該当するカスタムステータスが見つからない',
      })
      await db.close()
      return
    }

    // 削除実行
    await db.run('DELETE FROM custom_statuses WHERE cid = ?', [cid])

    res.status(204).end()
    await db.close()
  }
}

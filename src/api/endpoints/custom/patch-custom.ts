import { Express, Request, Response } from 'express'
import DB from '~/api/lib/db'
import EndPoint from '~/api/lib/EndPoint'
import loadConfig from '~/api/lib/loadConfig'
import omit from '~/api/lib/omit'
import validateCustomStatus from '~/api/lib/validations/custom-status'
import CustomStatus from '~/api/models/customStatus'

/**
 * PATCH /api/custom/:cid
 *
 * カスタムステータスの更新（一部）
 */
export default class PatchAdminCustomEndPoint extends EndPoint {
  constructor(app: Express) {
    super(app, 'patch', '/custom/:cid')
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

    const { cid: rawCid } = req.params
    if (!rawCid.match(/^\d+$/)) {
      res.status(400).json({
        message: 'cidは数値で指定してください',
      })
      await db.close()
      return
    }
    const cid = Number(rawCid)

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

    // 更新する内容を取得
    const keys = [
      'title',
      'subtitle',
      'text',
      'detailUrl',
      'status',
      'started_at',
      'ended_at',
    ].filter((k) => req.body[k] !== undefined)
    const values = keys.map((k) => req.body[k])

    // 更新する内容がない場合に弾く
    if (keys.length === 0) {
      res.status(400).json({
        message: '更新する内容無し',
      })
      await db.close()
      return
    }

    // バリデーション
    if (!(await validateCustomStatus(db, cid, res, req.body))) {
      return
    }

    // SQLを作成
    const sql = `UPDATE custom_statuses SET ${keys
      .map((k, _) => `${k} = ?`)
      .join(', ')} WHERE cid = ?`

    // 実行
    await db.run(sql, [...values, cid])

    // 結果を返す
    const result = (await db.get(
      'SELECT * FROM custom_statuses WHERE cid = ?',
      [cid]
    )) as CustomStatus
    res.json(omit(result, 'register_ip'))

    await db.close()
  }
}

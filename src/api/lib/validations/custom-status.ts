import { Response } from 'express'
import DB from '../db'
import { SERVICES } from '~/api/constants'
import { PostCustomStatus } from '~/api/models/customStatus'

/**
 * カスタムステータス バリテーション
 * @param db DB
 * @param res レスポンス
 * @param customStatus カスタムステータス
 * @returns {Promise<boolean>} バリテーション結果
 */
export default async function validateCustomStatus(
  db: DB,
  cid: number | null,
  res: Response,
  customStatus: Partial<PostCustomStatus>
): Promise<boolean> {
  // サービス ID の存在確認
  if (
    customStatus.sid !== undefined &&
    SERVICES.find((s) => s.sid === customStatus.sid) === undefined
  ) {
    res.status(400).json({
      message: 'サービス ID が不正です',
    })
    await db.close()
    return false
  }

  // NULL非許容のチェック
  if (
    [
      customStatus.sid,
      customStatus.title,
      customStatus.text,
      customStatus.status,
      customStatus.started_at,
      customStatus.ended_at,
    ].find((value) => value === undefined || value === null) !== undefined
  ) {
    res.status(400).json({
      message: 'バリテーションエラー (NULL非許容)',
    })
    await db.close()
    return false
  }

  // 同一タイトル・対象への既存登録がある場合に弾く
  if (
    customStatus.sid !== undefined &&
    customStatus.title !== undefined &&
    customStatus.started_at !== undefined &&
    (await isExists(
      db,
      cid,
      customStatus.sid,
      customStatus.title,
      customStatus.started_at
    ))
  ) {
    res.status(409).json({
      message:
        'サービスID・タイトル・開始日時にマッチするカスタムステータスが既に存在',
    })
    await db.close()
    return false
  }

  return true
}

async function isExists(
  db: DB,
  cid: number | null,
  sid: string,
  title: string,
  startedAt: string
) {
  const row = await db.get(
    'SELECT * FROM custom_statuses WHERE sid = ? AND title = ? AND started_at = ?' +
      (cid !== null ? ' AND cid != ?' : ''),
    [sid, title, startedAt]
  )
  return row !== undefined
}

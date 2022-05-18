import fs from 'fs'
import { Express, Request, Response } from 'express'
import { SERVICES } from '~/api/constants'
import EndPoint from '~/api/lib/EndPoint'
import Status from '~/api/models/status'
import DB from '~/api/lib/db'
import loadConfig from '~/api/lib/loadConfig'
import CustomStatus, { ResponseCustomStatus } from '~/api/models/customStatus'
import omit from '~/api/lib/omit'

/**
 * GET /api/status/:sid
 *
 * ステータスを取得
 */
export default class GetStatusEndPoint extends EndPoint {
  constructor(app: Express) {
    super(app, 'get', '/status/:sid')
  }

  async handle(req: Request, res: Response): Promise<void> {
    // TODO: カスタムステータス
    const { sid } = req.params
    try {
      const status = await getStatus(sid)
      res.json(status)
    } catch (err) {
      console.error(err)
      res.status(400)
      res.json({
        message: (err as any).message,
      })
    }
  }
}

interface CacheResult {
  sid: string
  status: Status
  unixtime: number
}

async function getStatus(sid: string): Promise<Status> {
  const service = SERVICES.find((s) => s.sid === sid)
  if (!service) {
    throw new Error(`Service not found: ${sid}`)
  }
  const customStatus = await getCustomStatus(sid)
  if (customStatus) {
    return {
      sid: service.sid,
      description:
        customStatus.text +
        '\n(' +
        customStatus.started_at +
        ' ～ ' +
        customStatus.ended_at +
        ')',
      detailUrl: customStatus.detailUrl ?? null,
      datetime: customStatus.updated_at,
      status: customStatus.status,
      loading: false,
    }
  }

  // 30分以内のキャッシュがあればそれを返す
  if (fs.existsSync('caches.json')) {
    const caches = JSON.parse(
      fs.readFileSync('caches.json', 'utf-8')
    ) as CacheResult[]
    const cache = caches.find((c) => c.sid === sid)
    if (cache) {
      if (cache.unixtime > new Date().getTime() - 10 * 60 * 1000) {
        return cache.status
      }
    }
  }

  const response = await service.check.execute()
  const message = response.message || '障害は発生しておりません。'
  const result = {
    sid: service.sid,
    description: message,
    detailUrl: response.detailUrl ?? null,
    datetime: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    status: response.status,
    loading: false,
  }
  // キャッシュに保存
  const caches = fs.existsSync('caches.json')
    ? (
        JSON.parse(fs.readFileSync('caches.json', 'utf-8')) as CacheResult[]
      ).filter((c) => c.sid !== sid)
    : []
  caches.push({
    sid,
    status: result,
    unixtime: new Date().getTime(),
  })
  fs.writeFileSync('caches.json', JSON.stringify(caches))

  return result
}

async function getCustomStatus(
  sid: string
): Promise<ResponseCustomStatus | null> {
  const config = loadConfig()
  const db = new DB(config.api.dbPath)
  const row = (await db.get(
    `SELECT * FROM custom_statuses WHERE sid = ? AND started_at < DATETIME('now', 'localtime') AND ended_at > DATETIME('now', 'localtime') ORDER BY cid DESC`,
    [sid]
  )) as CustomStatus
  if (row === undefined) {
    return null
  }
  const result = omit(row, 'register_ip') as ResponseCustomStatus
  await db.close()
  return result
}

function formatDate(date: Date, format: string): string {
  format = format.replace(/yyyy/g, String(date.getFullYear()))
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
  return format
}

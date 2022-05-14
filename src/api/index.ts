import fs from 'fs'
import express, { NextFunction } from 'express'
import Status from './models/status'
import { SERVICES } from './constants'

const app = express()
app.get('/', (_req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello, jaoweb-status-api!' })
})
app.get(
  '/status/:sid',
  (req: express.Request, res: express.Response, next: NextFunction) => {
    ;(async () => {
      const { sid } = req.params
      try {
        const status = await getStatus(sid)
        res.json(status)
      } catch (err) {
        res.status(400)
        res.json({
          message: (err as any).message,
        })
      }
    })().catch(next)
  }
)

module.exports = {
  path: '/api',
  handler: app,
}

interface CacheResult {
  sid: string
  status: Status
  unixtime: number
}

// 優先度:
// 1. ステータスデータベースを確認、期間内カラムがあるならそれを返す
// 2. 検出種別に応じて、検出処理を実施

// 検出種別
// - HTTP疎通確認
// - PING疎通確認
// - DB接続確認
// - Minecraft RCON疎通確認
// - statuspage.io で確認
// - HTTPレスポンス確認

async function getStatus(sid: string): Promise<Status> {
  const service = SERVICES.find((s) => s.sid === sid)
  if (!service) {
    throw new Error(`Service not found: ${sid}`)
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
    datetime: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss'),
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

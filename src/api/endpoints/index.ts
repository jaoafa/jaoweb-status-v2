import { Express, Request, Response } from 'express'
import EndPoint from '~/api/lib/EndPoint'

/**
 * GET /api/
 *
 * ルートエンドポイント
 */
export default class GetRootEndPoint extends EndPoint {
  constructor(app: Express) {
    super(app, 'get', '/')
  }

  handle(_req: Request, res: Response): Promise<void> {
    return new Promise<void>((resolve) => {
      res.json({ message: 'Hello, jaoweb-status-api!' })
      resolve()
    })
  }
}

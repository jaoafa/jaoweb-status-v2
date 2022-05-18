import { Express, Request, Response } from 'express'
import { SERVICES } from '~/api/constants'
import EndPoint from '~/api/lib/EndPoint'
import omit from '~/api/lib/omit'
import Service from '~/api/models/service'

type ServiceExcludeCheck = Omit<Service, 'check'>

/**
 * GET /api/service
 *
 * サービス一覧を取得
 * （`check` はレスポンスから除外する）
 */
export default class GetServiceEndPoint extends EndPoint {
  constructor(app: Express) {
    super(app, 'get', '/service')
  }

  handle(_req: Request, res: Response): Promise<void> {
    return new Promise<void>((resolve) => {
      const services = SERVICES.map((service) => {
        return omit(service, 'check') as ServiceExcludeCheck
      })
      res.json(services)
      resolve()
    })
  }
}

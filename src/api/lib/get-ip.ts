import { Request } from 'express'

export default function (req: Request) {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress
}

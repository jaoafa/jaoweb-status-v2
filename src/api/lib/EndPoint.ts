import { Express, Request, Response, NextFunction } from 'express'

type Method =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head'

export default abstract class EndPoint {
  app: Express
  method: Method
  path: string

  constructor(app: Express, method: Method, path: string) {
    this.app = app
    this.method = method
    this.path = path
  }

  abstract handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>

  register() {
    this.app[this.method](this.path, (req, res, next) => {
      this.handle(req, res, next).catch((err) => {
        next(err)
      })
    })
    console.log('Registered:', this.method, this.path)
  }
}

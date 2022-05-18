import express, { json as expressJson } from 'express'

import GetRootEndPoint from './endpoints'
import GetStatusEndPoint from './endpoints/status/get-status'
import EndPoint from './lib/EndPoint'
import GetAdminCustomEndPoint from './endpoints/custom/get-custom'
import PostAdminCustomEndPoint from './endpoints/custom/post-custom'
import GetServiceEndPoint from './endpoints/service'
import PatchAdminCustomEndPoint from './endpoints/custom/patch-custom'
import DeleteAdminCustomEndPoint from './endpoints/custom/delete-custom'

const app = express()
app.use(expressJson())

const endpoints: EndPoint[] = [
  new GetRootEndPoint(app),
  new GetServiceEndPoint(app),
  new GetStatusEndPoint(app),

  // カスタムステータス CRUD API
  new GetAdminCustomEndPoint(app),
  new PostAdminCustomEndPoint(app),
  new PatchAdminCustomEndPoint(app),
  new DeleteAdminCustomEndPoint(app),
]

for (const endpoint of endpoints) {
  endpoint.register()
}

module.exports = {
  path: '/api',
  handler: app,
}

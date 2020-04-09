import path from 'path'
import Koa from 'koa'
import compose from 'koa-compose'
import koaBody from 'koa-body'
import json from 'koa-json'
import cors from '@koa/cors'
// 安全插件
import helmet from 'koa-helmet'
// 静态资源插件
import statics from 'koa-static'
import compress from 'koa-compress'
import JWT from 'koa-jwt'

import router from './routes'
import config from './config/index'
import errorHandle from './common/ErrorHandle'
import TokenVerifyHandle from './common/TokenVerifyHandle.js'

const PORT = 4500

const app = new Koa()

const isDevMode = (process.env.NODE_ENV !== 'production')

// app.use(function * (next) {
//   try {
//     yield * next
//   } catch (e) {
//     let status = e.status || 500
//     let message = e.message || '服务器错误'
//     this.body = {
//       'code': status,
//       'msg': message
//     }
//   }
// })

const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: config.UN_AUTHENTICATION })

// koa-compose 集成中间件
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  json({ pretty: false, param: 'pretty' }),
  helmet(),
  errorHandle,
  // TokenVerifyHandle,
  // jwt,
  router()
])

if (isDevMode) {
  app.use(compress())
}

app.use(middleware)

app.listen(PORT)

import Utils from './../utils/Utils'
import ResponseCode from './../utils/ResponseCode'
import config from './../config'

export default async (ctx, next) => {
  const auth = ctx.get('Authorization')
  const token = auth.split(' ')[1]
  
  try {
    for (let item of config.UN_AUTHENTICATION) {
      if (item.test(ctx.originalUrl)) {
        Utils.verifyToken(token).then(res => {
          console.log('res:', res)
        })
        break
      }
    }
    await next()
  } catch (err) {
    ctx.status = err.status || ResponseCode.SERVICE_ERROR
    ctx.body = {
      code: ResponseCode.SERVICE_ERROR,
      msg: err.message
    }
  }
}

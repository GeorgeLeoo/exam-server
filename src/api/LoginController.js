import send from './../config/MailConfig'
import moment from 'moment'
import Response from '../utils/Response'
import ResponseCode from '../utils/ResponseCode'
import { login } from './../db/admin'

class LoginController {
  async login (ctx) {
    const { body } = ctx.request
    const { username, password } = body
    const response = new Response(ctx)
    if (!username) {
      response.send(ResponseCode.CLIENT_ERROR, '账号不能为空')
      return
    }
    if (!password) {
      response.send(ResponseCode.CLIENT_ERROR, '密码不能为空')
      return
    }
    const { code, msg, data } = await login(ctx, { username, password })
    response.send(code, msg, data)
  }
  
  async forget (ctx) {
    const { body } = ctx.request
    try {
      // 查询数据库有没有该邮箱
      const sendInfo = {
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'George'
      }
      let result = await send(sendInfo)
      const response = new Response(ctx)
      response.send(200, '邮件发送成功', result)
    } catch (e) {
      console.log(e)
    }
  }
}

const loginController = new LoginController()

export default loginController

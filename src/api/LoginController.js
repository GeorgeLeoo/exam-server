import send from './../config/MailConfig'
import moment from 'moment'
import Response from "../utils/Response";

class LoginController {
  async forget(ctx) {
    const {body} = ctx.request
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
      response.send(200,  '邮件发送成功', result)
    } catch (e) {
      console.log(e)
    }
  }
}

const loginController = new LoginController()

export default loginController

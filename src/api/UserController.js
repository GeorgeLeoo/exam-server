import send from './../config/MailConfig'
import moment from 'moment'
import Response from '../utils/Response'
import ResponseCode from '../utils/ResponseCode'
import {
  getUserInfo,
  hasUserEmail,
  hasUsername,
  login,
  register,
  getUserInfos,
  openOrCloseUser
} from '../db/moduels/UserDB'

class UserController {
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
    let { code, msg, data } = await login({ username, password })
    response.send(code, msg, data)
  }
  
  async register (ctx) {
    const { body } = ctx.request
    const { username, password, rePassword, email } = body
    const response = new Response(ctx)
    if (!username) {
      response.send(ResponseCode.CLIENT_ERROR, '账号不能为空')
      return
    }
    if (!password) {
      response.send(ResponseCode.CLIENT_ERROR, '密码不能为空')
      return
    }
    if (!rePassword) {
      response.send(ResponseCode.CLIENT_ERROR, '确认密码不能为空')
      return
    }
    if (rePassword !== password) {
      response.send(ResponseCode.CLIENT_ERROR, '两次密码不一致')
      return
    }
    if (!email) {
      response.send(ResponseCode.CLIENT_ERROR, '邮箱不能为空')
      return
    }
    if (await hasUsername(username)) {
      response.send(ResponseCode.CLIENT_ERROR, '用户名已存在')
      return
    }
    if (await hasUserEmail(email)) {
      response.send(ResponseCode.CLIENT_ERROR, '邮箱已存在')
      return
    }
    let { code, msg, data } = await register({ username, password, email })
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
  
  async info (ctx) {
    const { username } = ctx.request.query
    const response = new Response(ctx)
    console.log(username)
    if (!username) {
      response.send(ResponseCode.CLIENT_ERROR, '账号不能为空')
      return
    }
    let { code, msg, data } = await getUserInfo(username)
    response.send(code, msg, data)
  }
  
  async getUserInfos (ctx) {
    const response = new Response(ctx)
    let { code, msg, data } = await getUserInfos()
    response.send(code, msg, data)
  }
  
  async createUser (ctx) {
    const { body } = ctx.request
    const { username, password, rePassword, email, gender, phone } = body
    const response = new Response(ctx)
    if (!username) {
      response.send(ResponseCode.CLIENT_ERROR, '账号不能为空')
      return
    }
    if (!password) {
      response.send(ResponseCode.CLIENT_ERROR, '密码不能为空')
      return
    }
    if (!rePassword) {
      response.send(ResponseCode.CLIENT_ERROR, '确认密码不能为空')
      return
    }
    if (rePassword !== password) {
      response.send(ResponseCode.CLIENT_ERROR, '两次密码不一致')
      return
    }
    if (!email) {
      response.send(ResponseCode.CLIENT_ERROR, '邮箱不能为空')
      return
    }
    if (!gender) {
      response.send(ResponseCode.CLIENT_ERROR, '性别不能为空')
      return
    }
    if (!phone) {
      response.send(ResponseCode.CLIENT_ERROR, '手机号不能为空')
      return
    }
    if (await hasAdminUsername(username)) {
      response.send(ResponseCode.CLIENT_ERROR, '用户名已存在')
      return
    }
    if (await hasAdminEmail(email)) {
      response.send(ResponseCode.CLIENT_ERROR, '邮箱已存在')
      return
    }
    let { code, msg, data } = await register({ username, password, email })
    response.send(code, msg, data)
  }
  
  async openOrCloseUser (ctx) {
    const { _id, status } = ctx.request.query
    const response = new Response(ctx)
    let { code, msg, data } = await openOrCloseUser({ _id, status })
    response.send(code, msg, data)
  }
}

const loginController = new UserController()

export default loginController

import svgCaptcha from 'svg-captcha'
import { captcha } from './settings'
import Response from '../utils/Response'
import { getValue, setValue } from './../config/RedisConfig'

class PublicController {
  
  async getCaptcha (ctx) {
    const body = ctx.request.query
    console.log(body)
    
    const response = new Response(ctx)
    const newCaptcha = svgCaptcha.create(captcha)
    setValue(body.sid, newCaptcha.text, 15)
    getValue(body.sid).then((res) => {
      console.log(res)
    })
    response.send(200, '', newCaptcha.data)
  }
  
  test (ctx) {
    const response = new Response(ctx)
    response.send(200, '', { success: 200 })
  }
}

const publicController = new PublicController()

export default publicController

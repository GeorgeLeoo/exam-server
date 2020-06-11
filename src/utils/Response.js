class Response {
  constructor (ctx) {
    this.ctx = ctx
  }

  send (code=200,  msg = '', data = []) {
    let body = {
      code,
      msg,
      data
    }
    this.ctx.status = code
    this.ctx.body = body
  }
}

export default Response

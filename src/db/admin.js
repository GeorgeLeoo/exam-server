import Admins from './../model/admin'
import ResponseCode from './../utils/ResponseCode'
import Utils from './../utils/Utils'

export const login = function (ctx, query) {
  return new Promise(((resolve, reject) => {
    Admins.findOne(query, (err, admins) => {
      if (err) {
        reject({ code: ResponseCode.SERVICE_ERROR, msg: err })
      }
      if (!Utils.isEmptyObject(admins)) {
        reject({ code: ResponseCode.CLIENT_ERROR, msg: '账号或密码不正确' })
      }
      resolve({ code: ResponseCode.SUCCESS, data: { token: 'xxxxxx' } })
    })
  }))
}

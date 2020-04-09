import jsonwebtoken from 'jsonwebtoken'
import config from './../config'

class Utils {
  /**
   * 判断对象是否为空
   * @param obj
   * @returns {boolean}
   */
  isEmptyObject (obj) {
    if (typeof obj !== 'object') {
      return true
    }
    if (obj === null) {
      return true
    }
    const keys = Object.keys(JSON.parse(JSON.stringify(obj)))
    return keys.length === 0
  }
  
  /**
   * 获取token认证信息
   * @param _id 用户id
   */
  getToken (_id) {
    return jsonwebtoken.sign({
      _id,
      exp: config.TOKEN_EXP
    }, config.JWT_SECRET)
  }
  verifyToken(token){
    return new Promise(((resolve, reject) => {
      jsonwebtoken.verify(token, config.JWT_SECRET, function(err, decoded) {
        if (err) {
          resolve(err)
        }
        resolve(decoded)
      });
    }))
  }
}

export default new Utils()

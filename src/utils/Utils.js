import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
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
  
  /**
   * 保存文件
   * @param file  文件
   * @param path  文件路径
   * @returns {Promise<unknown>}
   */
  saveFile(file, path) {
    return new Promise((resolve, reject) => {
      // 创建可读流
      let render = fs.createReadStream(file.path);
      // 创建写入流
      let upStream = fs.createWriteStream(path);
      render.pipe(upStream);
      upStream.on('finish', () => {
        resolve(path)
      });
      upStream.on('error', (err) => {
        reject(err)
      });
      resolve(path)
    })
  }
}

export default new Utils()

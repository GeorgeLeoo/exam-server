import Users from '../../model/users'
import ResponseCode from '../../utils/ResponseCode'
import Utils from '../../utils/Utils'
import MongoCode from '../../utils/MongoCode'
import StatusCode from '../../utils/StatusCode'

/**
 * 登录
 * @param query
 * @returns {Promise<{code, msg. data}>}
 */
export const login = function (query) {
  return new Promise((resolve => {
      const { _id, username, password } = query
      Users.findOne({ username, password }, (err, users) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        if (Utils.isEmptyObject(users)) {
          resolve({ code: ResponseCode.CLIENT_ERROR, msg: '账号或密码不正确' })
        }
        const data = {
          token: Utils.getToken(_id)
        }
        resolve({ code: ResponseCode.SUCCESS, data })
      })
    }
  ))
}

/**
 * 注册
 * @param insert
 * @returns {Promise<{code, msg. data}>}
 */
export const register = function (insert) {
  return new Promise((resolve => {
    Users.insertMany(insert, (err, users) => {
      if (err) {
        if (err.code === MongoCode.UNIQUE) {
          resolve({ code: ResponseCode.CLIENT_ERROR, msg: '用户名已存在' })
        } else {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
      }
      resolve({ code: ResponseCode.SUCCESS, data: [] })
    })
  }))
}

/**
 * 查询账号是否存在
 * @param username
 * @returns {Promise<{code, msg. data}>}
 */
export const hasUsername = function (username) {
  return new Promise((resolve => {
    Users.findOne({ username }, (err, users) => {
      if (err) {
        resolve(false)
      }
      if (Utils.isEmptyObject(users)) {
        resolve(false)
      }
      resolve(true)
    })
  }))
}

/**
 *
 * 查询是否有邮箱
 * @param email
 * @returns {Promise<{code, msg. data}>}
 */
export const hasUserEmail = function (email) {
  return new Promise((resolve => {
    Users.findOne({ email }, (err, users) => {
      if (err) {
        resolve(false)
      }
      if (Utils.isEmptyObject(users)) {
        resolve(false)
      }
      resolve(true)
    })
  }))
}

/**
 * 获取考生信息
 * @param username
 * @returns {Promise<unknown>}
 */
export const getUserInfo = function (username) {
  return new Promise(resolve => {
    Users.findOne({ username }, (err, users) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      }
      const user = {
        _id: users._id,
        username: users.username,
        email: users.email,
        state: users.state,
        createdAt: users.createdAt
      }
      resolve({ code: ResponseCode.SUCCESS, data: { user } })
    })
  })
}

/**
 * 获取所有考生信息
 * @returns {Promise<unknown>}
 */
export const getUserInfos = function () {
  return new Promise(resolve => {
    Users.find({}, (err, users) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      }
      resolve({ code: ResponseCode.SUCCESS, data: users })
    })
  })
}


/**
 * 启动或关闭账号
 * @param query
 * @returns {Promise<unknown>}
 */
export const openOrCloseUser = function (query) {
  return new Promise((resolve => {
      Users.updateOne({ _id: query._id }, { $set: { status: query.status } }, (err, notices) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        resolve({ code: ResponseCode.SUCCESS, msg: StatusCode[query.status] + '成功', data: [] })
      })
    }
  ))
}

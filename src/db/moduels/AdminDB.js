import Admins from '../../model/admins'
import ResponseCode from '../../utils/ResponseCode'
import Utils from '../../utils/Utils'
import MongoCode from '../../utils/MongoCode'
import StatusCode from './../../utils/StatusCode'

/**
 * 登录
 * @param query
 * @returns {Promise<{code, msg. data}>}
 */
export const login = function (query) {
  return new Promise((resolve => {
      const { _id, username, password } = query
      Admins.findOne({ username, password }, (err, admins) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        if (Utils.isEmptyObject(admins)) {
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
    Admins.insertMany(insert, (err, admins) => {
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
export const hasAdminUsername = function (username) {
  return new Promise((resolve => {
    Admins.findOne({ username }, (err, admins) => {
      if (err) {
        resolve(false)
      }
      if (Utils.isEmptyObject(admins)) {
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
export const hasAdminEmail = function (email) {
  return new Promise((resolve => {
    Admins.findOne({ email }, (err, admins) => {
      if (err) {
        resolve(false)
      }
      if (Utils.isEmptyObject(admins)) {
        resolve(false)
      }
      resolve(true)
    })
  }))
}

/**
 * 获取管理员信息
 * @param username
 * @returns {Promise<unknown>}
 */
export const getAdminUserInfo = function (username) {
  return new Promise(resolve => {
    Admins.findOne({ username }, (err, admins) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      }
      const user = {
        _id: admins._id,
        username: admins.username,
        email: admins.email,
        state: admins.state,
        createdAt: admins.createdAt
      }
      resolve({ code: ResponseCode.SUCCESS, data: { user } })
    })
  })
}

/**
 * 获取所有管理员信息
 * @returns {Promise<unknown>}
 */
export const getAdminUserInfos = function () {
  return new Promise(resolve => {
    Admins.find({}, (err, admins) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      }
      resolve({ code: ResponseCode.SUCCESS, data: admins })
    })
  })
}

/**
 * 启动或关闭账号
 * @param query
 * @returns {Promise<unknown>}
 */
export const openOrCloseAdminUser = function (query) {
  return new Promise((resolve => {
      Admins.updateOne({ _id: query._id }, { $set: { status: query.status } }, (err, notices) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        resolve({ code: ResponseCode.SUCCESS, msg: StatusCode[query.status] + '成功', data: [] })
      })
    }
  ))
}


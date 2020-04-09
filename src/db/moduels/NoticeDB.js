import Notices from '../../model/notices'
import ResponseCode from '../../utils/ResponseCode'

export const getNotices = function (query) {
  return new Promise((resolve => {
      Notices.find(query.condition, (err, notices) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        resolve({ code: ResponseCode.SUCCESS, data: notices })
      }).limit(parseInt(query.page.pageSize)).skip((parseInt(query.page.currentPage) - 1) * parseInt(query.page.pageSize)).sort({ _id: -1 })
    }
  ))
}

export const createNotice = function (body) {
  return new Promise((resolve => {
      Notices.insertMany(body, (err, notices) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        resolve({ code: ResponseCode.SUCCESS, msg: '添加成功', data: [] })
      })
    }
  ))
}

export const updateNotice = function (body) {
  return new Promise((resolve => {
      Notices.updateOne({ _id: body._id }, { $set: { content: body.content } }, (err, notices) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        if (notices.nModified === 1) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: '更新成功', data: [] })
        } else {
          resolve({ code: ResponseCode.SUCCESS, msg: '更新失败', data: [] })
        }
      })
    }
  ))
}

export const deleteNotice = function (query) {
  return new Promise((resolve => {
      Notices.updateOne({ _id: query._id }, { $set: { isDelete: 1 } }, (err, notices) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        if (notices.nModified === 1) {
          resolve({ code: ResponseCode.SUCCESS, msg: '删除成功', data: [] })
        } else {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: '删除失败', data: [] })
        }
      })
    }
  ))
}



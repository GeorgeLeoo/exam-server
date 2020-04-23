import Papers from '../../model/papers'
import ResponseCode from '../../utils/ResponseCode'

/**
 * 查询总数量
 * @param condition
 * @returns {Promise<unknown>}
 */
const getCount = function (condition) {
  return new Promise(resolve => {
    Papers.countDocuments(condition, function (err, count) {
      resolve(count)
    })
  })
}

/**
 * 查询试卷
 * @param query
 * @returns {Promise<unknown>}
 */
export const getPapers = function (query) {
  return new Promise(async (resolve) => {
    const count = await getCount(query.condition)
    let select = { isDelete: 0, __v: 0 }
    const populates = [
      { path: 'admin', select: { username: 1, _id: 0 } },
      { path: 'subject', select: { name: 1, _id: 1 } },
    ]
    if (query.type !== 'SIMPLE') {
      populates.concat([{ path: 'single', select: { isDelete: 0, __v: 0 }, subPopulate: [{ path: 'admin', select: { username: 1, _id: 0 }}, { path: 'subjectId', select: { name: 1, _id: 1 } }] },
        { path: 'multiple', select: { isDelete: 0, __v: 0 }, subPopulate: [{ path: 'admin', select: { username: 1, _id: 0 }}, { path: 'subjectId', select: { name: 1, _id: 1 } }] },
        { path: 'judge', select: { isDelete: 0, __v: 0 }, subPopulate: [{ path: 'admin', select: { username: 1, _id: 0 }}, { path: 'subjectId', select: { name: 1, _id: 1 } }] },
        { path: 'completion', select: { isDelete: 0, __v: 0 }, subPopulate: [{ path: 'admin', select: { username: 1, _id: 0 }}, { path: 'subjectId', select: { name: 1, _id: 1 } }] },
        { path: 'afq', select: { isDelete: 0, __v: 0 }, subPopulate: [{ path: 'admin', select: { username: 1, _id: 0 }}, { path: 'subjectId', select: { name: 1, _id: 1 } }] }])
    }
    Papers.find(query.condition, select)
      .populate(populates)
      .limit(parseInt(query.page.limit))
      .skip((parseInt(query.page.page) - 1) * parseInt(query.page.limit))
      .sort({ _id: -1 })
      .exec((err, papers) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        resolve({
          code: ResponseCode.SUCCESS, data: {
            list: papers,
            total: count
          }
        })
      })
  })
}

/**
 * 创建试卷
 * @param body
 * @returns {Promise<unknown>}
 */
export const createPaper = function (body) {
  return new Promise((resolve) => {
    Papers.insertMany(body, (err, papers) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      }
      resolve({ code: ResponseCode.SUCCESS, msg: '添加成功', data: [] })
    })
  })
}

/**
 * 更新试卷
 * @param body
 * @returns {Promise<unknown>}
 */
export const updatePaper = function (body) {
  return new Promise((resolve) => {
    Papers.updateOne(body.query, { $set: body.update }, (err, papers) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      }
      if (papers.nModified === 1) {
        resolve({
          code: ResponseCode.SUCCESS,
          msg: '更新成功',
          data: [],
        })
      } else {
        resolve({
          code: ResponseCode.SERVICE_ERROR,
          msg: '更新失败',
          data: [],
        })
      }
    })
  })
}

/**
 * 删除试卷
 * @param query
 * @returns {Promise<unknown>}
 */
export const deletePaper = function (query) {
  return new Promise((resolve) => {
    Papers.updateOne(
      { _id: query._id },
      { $set: { isDelete: 1 } },
      (err, papers) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        }
        if (papers.nModified === 1) {
          resolve({
            code: ResponseCode.SUCCESS,
            msg: '删除成功',
            data: [],
          })
        } else {
          resolve({
            code: ResponseCode.SERVICE_ERROR,
            msg: '删除失败',
            data: [],
          })
        }
      }
    )
  })
}

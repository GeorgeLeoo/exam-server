import Response from '../utils/Response'
import ResponseCode from '../utils/ResponseCode'
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject
} from '../db/moduels/SubjectDB'

class SubjectController {
  /**
   * 获取科目信息
   * @param ctx
   * @returns {Promise<void>}
   */
  async getSubject (ctx) {
    const response = new Response(ctx)
    const { name, author, pageSize, currentPage } = ctx.request.query
    if (!pageSize && pageSize > 0) {
      response.send(ResponseCode.CLIENT_ERROR, '页面大小必须大于0')
      return
    }
    if (!currentPage) {
      response.send(ResponseCode.CLIENT_ERROR, '当前页面必须大于0')
      return
    }
    
    const condition = { isDelete: 0 }
    name && (condition.name = name)
    author && (condition.author = author)
    
    let { code, msg, data } = await getSubjects({
      condition,
      page: { pageSize, currentPage }
    })
    response.send(code, msg, data)
  }
  
  async createSubject (ctx) {
    const response = new Response(ctx)
    const { name, desc, author } = ctx.request.body
    if (!name) {
      response.send(ResponseCode.CLIENT_ERROR, '科目名称不能为空')
      return
    }
    if (!desc) {
      response.send(ResponseCode.CLIENT_ERROR, '科目描述不能为空')
      return
    }
    if (!author) {
      response.send(ResponseCode.CLIENT_ERROR, '作者不能为空')
      return
    }
    let { code, msg, data } = await createSubject({ name, desc, author })
    response.send(code, msg, data)
  }
  
  async updateSubject (ctx) {
    const { _id, name, desc } = ctx.request.body
    const response = new Response(ctx)
    let { code, msg, data } = await updateSubject({ _id, name, desc })
    response.send(code, msg, data)
  }
  
  async deleteSubject (ctx) {
    const { _id } = ctx.request.query
    const response = new Response(ctx)
    let { code, msg, data } = await deleteSubject({ _id })
    response.send(code, msg, data)
  }
}

const subjectController = new SubjectController()

export default subjectController

import Response from '../utils/Response'
import ResponseCode from '../utils/ResponseCode'
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice
} from '../db/moduels/NoticeDB'

class NoticeController {
  /**
   * 获取公告信息
   * @param ctx
   * @returns {Promise<void>}
   */
  async getNotice (ctx) {
    const response = new Response(ctx)
    const { content, author, pageSize, currentPage } = ctx.request.query
    if (!pageSize && pageSize > 0) {
      response.send(ResponseCode.CLIENT_ERROR, '页面大小必须大于0')
      return
    }
    if (!currentPage) {
      response.send(ResponseCode.CLIENT_ERROR, '当前页面必须大于0')
      return
    }
    const condition = { isDelete: 0 }
    content && (condition.content = name)
    author && (condition.author = author)
    let { code, msg, data } = await getNotices({
      condition,
      page: { pageSize, currentPage }
    })
    response.send(code, msg, data)
  }
  
  async createNotice (ctx) {
    const response = new Response(ctx)
    const { content, author } = ctx.request.body
    if (!content) {
      response.send(ResponseCode.CLIENT_ERROR, '公告内容不能为空')
      return
    }
    let { code, msg, data } = await createNotice({ content, author })
    response.send(code, msg, data)
  }
  
  async updateNotice (ctx) {
    const { _id, content } = ctx.request.body
    const response = new Response(ctx)
    let { code, msg, data } = await updateNotice({ _id, content })
    response.send(code, msg, data)
  }
  
  async deleteNotice (ctx) {
    const { _id } = ctx.request.query
    const response = new Response(ctx)
    let { code, msg, data } = await deleteNotice({ _id })
    response.send(code, msg, data)
  }
}

const noticeController = new NoticeController()

export default noticeController

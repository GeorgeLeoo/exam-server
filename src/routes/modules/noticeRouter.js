import Router from 'koa-router'
import noticeController from '../../api/NoticeController'

const router = new Router()

// 查询公告信息
router.get('/notices', noticeController.getNotice)

// 创建公告
router.post('/notices', noticeController.createNotice)

// 更新公告
router.patch('/notices', noticeController.updateNotice)

// 删除公告
router.delete('/notices', noticeController.deleteNotice)

export default router

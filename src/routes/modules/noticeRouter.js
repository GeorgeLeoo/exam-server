import Router from 'koa-router'
import noticeController from '../../api/NoticeController'

const router = new Router()

router.get('/notices', noticeController.getNotice)
router.post('/notices', noticeController.createNotice)
router.patch('/notices', noticeController.updateNotice)
router.delete('/notices', noticeController.deleteNotice)

export default router

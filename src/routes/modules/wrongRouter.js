import Router from 'koa-router'
import wrongController from '../../api/WrongController'

const router = new Router()

// 查询公告信息
router.get('/wrongs', wrongController.getWrongs)

router.post('/wrongs', wrongController.createWrong)

router.get('/wrongs/type', wrongController.getWrongsByType)

export default router

import Router from 'koa-router'
import completionController from '../../api/CompletionController'

const router = new Router()

// 查询单选信息
router.get('/completions', completionController.getCompletion)

// 创建单选
router.post('/completions', completionController.createCompletion)

// 更新单选
router.patch('/completions', completionController.updateCompletion)

// 删除单选
router.delete('/completions', completionController.deleteCompletion)

export default router

import Router from 'koa-router'
import answerController from '../../api/AnswerController'

const router = new Router()

// 查询考生答案信息
router.get('/answers', answerController.getAnswer)

// 创建考生答案
router.post('/answers', answerController.createAnswer)

// 更新考生答案
router.patch('/answers/score', answerController.updateAnswer)

// 删除考生答案
router.delete('/answers', answerController.deleteAnswer)

export default router

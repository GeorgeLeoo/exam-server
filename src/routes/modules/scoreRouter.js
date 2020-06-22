import Router from 'koa-router'
import scoreController from '../../api/ScoreController'

const router = new Router()

// 查询成绩信息
router.get('/scores', scoreController.getScore)

// 创建成绩
router.post('/scores', scoreController.createScore)

// 更新成绩
router.patch('/scores', scoreController.updateScore)

// 删除成绩
router.delete('/scores', scoreController.deleteScore)

export default router

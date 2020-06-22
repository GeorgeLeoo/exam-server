import Router from 'koa-router'
import judgeController from '../../api/JudgeController'

const router = new Router()

router.prefix('/question-bank')

// 查询判断信息
router.get('/judges', judgeController.getJudge)

// 创建判断
router.post('/judges', judgeController.createJudge)

// 更新判断
router.patch('/judges', judgeController.updateJudge)

// 删除判断
router.delete('/judges', judgeController.deleteJudge)

// 查询考点
router.get('/judges/knowledge-points', judgeController.getKnowledgePoint)
export default router

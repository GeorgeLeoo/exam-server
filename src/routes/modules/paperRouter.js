import Router from 'koa-router'
import paperController from '../../api/PaperController'

const router = new Router()

// 查询试卷信息
router.get('/papers', paperController.getPaper)

// 创建试卷
router.post('/papers', paperController.createPaper)

// 更新试卷
router.patch('/papers', paperController.updatePaper)

// 删除试卷
router.delete('/papers', paperController.deletePaper)

// 查询考点
router.get('/papers/knowledge-points', paperController.getKnowledgePoint)

export default router

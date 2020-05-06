import Router from 'koa-router'
import paperController from '../../api/PaperController'

const router = new Router()

// 查询试卷信息
router.get('/papers', paperController.getPaper)

// 通过id查询试卷
router.get('/paper', paperController.getPaperById)

// 考点查询
// router.get('/paper', paperController.getWrongKnowledgePoint)

// 创建试卷
router.post('/papers', paperController.createPaper)

// 更新试卷
router.patch('/papers', paperController.updatePaper)

// 删除试卷
router.delete('/papers', paperController.deletePaper)

// 查询考点
router.get('/papers/knowledge-points', paperController.getKnowledgePoint)

// 验证密码
router.post('/papers/exam', paperController.verifyPaperPassword)

export default router

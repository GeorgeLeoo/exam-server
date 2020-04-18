import Router from 'koa-router'
import afqController from '../../api/AFQController'

const router = new Router()

router.prefix('/question-bank')

// 查询单选信息
router.get('/afqs', afqController.getAFQ)

// 创建单选
router.post('/afqs', afqController.createAFQ)

// 更新单选
router.patch('/afqs', afqController.updateAFQ)

// 删除单选
router.delete('/afqs', afqController.deleteAFQ)

export default router

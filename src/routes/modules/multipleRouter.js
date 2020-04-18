import Router from 'koa-router'
import multipleController from '../../api/MultipleController'

const router = new Router()

router.prefix('/question-bank')

// 查询多选信息
router.get('/multiples', multipleController.getMultiple)

// 创建多选
router.post('/multiples', multipleController.createMultiple)

// 更新多选
router.patch('/multiples', multipleController.updateMultiple)

// 删除多选
router.delete('/multiples', multipleController.deleteMultiple)

export default router

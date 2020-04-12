import Router from 'koa-router'
import multipleController from '../../api/MultipleController'

const router = new Router()

// 查询多选信息
router.get('/multiple', multipleController.getMultiple)

// 创建多选
router.post('/multiple', multipleController.createMultiple)

// 更新多选
router.patch('/multiple', multipleController.updateMultiple)

// 删除多选
router.delete('/multiple', multipleController.deleteMultiple)

export default router

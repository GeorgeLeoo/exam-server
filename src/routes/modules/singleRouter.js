import Router from 'koa-router'
import singleController from '../../api/SingleController'

const router = new Router()

// 查询单选信息
router.get('/singles', singleController.getSingle)

// 创建单选
router.post('/singles', singleController.createSingle)

// 更新单选
router.patch('/singles', singleController.updateSingle)

// 删除单选
router.delete('/singles', singleController.deleteSingle)

export default router

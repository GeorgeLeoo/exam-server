import Router from 'koa-router'
import adminController from '../../api/AdminController'

const router = new Router()

router.prefix('/admin')

// 登录
router.post('/login', adminController.login)

// 注册
router.post('/register', adminController.register)

// 忘记密码
router.post('/forget', adminController.forget)

// 获取某用户信息
router.get('/info', adminController.info)

// 获取全部用户信息
router.get('/infos', adminController.getAdminUserInfos)

// 创建用户
router.post('/info', adminController.createAdmin)

// 用户状态【开启、关闭】
router.put('/status', adminController.openOrCloseAdminUser)

// 更新用户
router.patch('/info', adminController.updateAdminUser)

router.get('/all', adminController.getAdminAllUser)

export default router

import Router from 'koa-router'
import adminController from '../../api/AdminController'

const router = new Router()

router.prefix('/admin')

router.post('/login', adminController.login)
router.post('/register', adminController.register)
router.post('/forget', adminController.forget)
router.get('/info', adminController.info)
router.get('/infos', adminController.getAdminUserInfos)
router.post('/info', adminController.createAdmin)
router.post('/status', adminController.openOrCloseAdminUser)

export default router

import Router from 'koa-router'
import userController from '../../api/UserController'

const router = new Router()

router.prefix('/users')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/forget', userController.forget)
router.get('/info', userController.info)
router.get('/infos', userController.getUserInfos)
router.post('/infos', userController.createUser)
router.post('/status', userController.openOrCloseUser)

export default router

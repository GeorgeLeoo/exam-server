import Router from 'koa-router'

import publicController from '../api/PublicController'

const router = new Router()

router.get('/test', publicController.test)
router.get('/getCaptcha', publicController.getCaptcha)

export default router
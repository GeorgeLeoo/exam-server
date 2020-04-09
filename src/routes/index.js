import combineRoutes from 'koa-combine-routers'

import publicRouter from './modules/publicRouter'
import userRouter from './modules/userRouter'
import adminRouter from './modules/adminRouter'
import noticeRouter from './modules/noticeRouter'
import subjectRouter from './modules/subjectRouter'

export default combineRoutes(publicRouter, userRouter, adminRouter, noticeRouter, subjectRouter)

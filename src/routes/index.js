import combineRoutes from 'koa-combine-routers'

import publicRouter from './modules/publicRouter'
import userRouter from './modules/userRouter'
import adminRouter from './modules/adminRouter'
import noticeRouter from './modules/noticeRouter'
import subjectRouter from './modules/subjectRouter'
import singleRouter from './modules/singleRouter'
import multipleRouter from './modules/multipleRouter'
import judgeRouter from './modules/judgeRouter'
import completionRouter from './modules/completionRouter'
import afqRouter from './modules/afqRouter'
import paperRouter from './modules/paperRouter'
import answerRouter from './modules/answerRouter'
import scoreRouter from './modules/scoreRouter'
import uploadRouter from './modules/uploadRouter'

export default combineRoutes(publicRouter, userRouter, adminRouter, noticeRouter, subjectRouter, singleRouter,
  multipleRouter, judgeRouter, completionRouter, afqRouter, paperRouter, scoreRouter, answerRouter,
  uploadRouter)

import Router from 'koa-router'
import subjectController from '../../api/SubjectController'

const router = new Router()

// 查询科目
router.get('/subjects', subjectController.getSubject)

// 创建科目
router.post('/subjects', subjectController.createSubject)

// 更新科目
router.patch('/subjects', subjectController.updateSubject)

// 删除科目
router.delete('/subjects', subjectController.deleteSubject)

export default router

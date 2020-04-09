import Router from 'koa-router'
import subjectController from '../../api/SubjectController'

const router = new Router()

router.get('/subjects', subjectController.getSubject)
router.post('/subjects', subjectController.createSubject)
router.patch('/subjects', subjectController.updateSubject)
router.delete('/subjects', subjectController.deleteSubject)

export default router

const router = require('express').Router()
const controller = require('../controllers/supportController')
const middleware = require('../middleware')


router.get('/', middleware.stripToken, middleware.verifyToken, controller.GetResources)


router.post('/', middleware.stripToken, middleware.verifyToken, controller.CreateResource)
router.put('/:id', middleware.stripToken, middleware.verifyToken, controller.UpdateResource)
router.delete('/:id', middleware.stripToken, middleware.verifyToken, controller.DeleteResource)

module.exports = router

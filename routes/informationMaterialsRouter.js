const express = require('express')
const router = express.Router()
const informationMaterialsController = require('../controllers/informationMaterialsController')
const { stripToken, verifyToken } = require('../middleware')
const isAdmin = require('../middleware/isAdmin')



router.get('/', informationMaterialsController.getAll)
router.post('/', stripToken, verifyToken, isAdmin, informationMaterialsController.create)
router.put('/:id', stripToken, verifyToken, isAdmin, informationMaterialsController.update)
router.delete('/:id', stripToken, verifyToken, isAdmin, informationMaterialsController.remove)

module.exports = router
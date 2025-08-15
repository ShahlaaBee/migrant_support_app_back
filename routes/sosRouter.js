const express = require('express')
const router = express.Router()
const sosController = require('../controllers/sosController')
const { stripToken, verifyToken } = require('../middleware')
const isAdmin = require('../middleware/isAdmin')


router.get('/', stripToken, verifyToken, sosController.GetSOS)


router.post('/', stripToken, verifyToken, sosController.CreateSOS)


router.put('/:id', stripToken, verifyToken, sosController.UpdateSOS)

router.delete('/:id', stripToken, verifyToken, sosController.DeleteSOS)



router.get('/admin', stripToken, verifyToken, isAdmin, sosController.GetAllSOS)


module.exports = router

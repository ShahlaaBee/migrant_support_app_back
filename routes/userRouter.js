const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { stripToken, verifyToken } = require('../middleware')
const isAdmin = require('../middleware/isAdmin')


router.get('/me', stripToken, verifyToken, userController.GetUser)


router.get('/', stripToken, verifyToken, isAdmin, userController.GetAllUsers)


router.put('/:id/promote', stripToken, verifyToken, isAdmin, userController.PromoteUser)

module.exports = router

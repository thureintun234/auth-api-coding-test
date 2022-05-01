const userController = require('../controllers/user')
const router = require('express').Router()
const auth = require('../middleware/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)

// add middleware for authentication
router.get('/list', auth, userController.getUsers)

module.exports = router
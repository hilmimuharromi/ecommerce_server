const router = require('express').Router()
const controller = require('../controllers/userController')

router.post('/register', controller.register)

module.exports = router
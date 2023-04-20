const express = require('express')
const router = express.Router()
const Routes = require('../controllers/main')
const errormiddelware = require('../middelware/senderror')
const signupmiddlewere = require('../middelware/signup2')
const usererrorFunction = require('../middelware/usererror')
const regularerrorFunction = require('../middelware/regularerror')

router.use(express.json())
router.use(express.urlencoded())
router.post('/signUp',signupmiddlewere.signup2error,Routes.signUp)
router.post('/login',Routes.login)
router.post('/jwtverify',Routes.jwtverify)
//router.post('/create_order',Routes.createorder)
//router.post('/complete_order',Routes.completeorder)
router.use(errormiddelware)
router.use(usererrorFunction)
router.use(regularerrorFunction)





module.exports = router






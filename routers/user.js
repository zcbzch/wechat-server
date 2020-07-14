const Router = require('koa-router')
const router = new Router()
const userController = require('../controllers/user');


const routers = router
  .get('/userInfo', userController.getUserInfo)
  .post('/signIn', userController.signIn)

module.exports = routers;

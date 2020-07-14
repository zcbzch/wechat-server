const Router = require('koa-router')
const router = new Router()
const roomController = require('../controllers/room')

const routers = router
  .get('/roomList', roomController.getRoomList)

module.exports = routers

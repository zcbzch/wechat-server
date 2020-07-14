const Router = require('koa-router');
const router = new Router();

const user = require('./user');
const room = require('./room');

// router.use('')

router.use('/user', user.routes(), user.allowedMethods())
  .use('/room', room.routes(), room.allowedMethods())

module.exports = router;
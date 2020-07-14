const roomService = require('./../services/room')
// const roomCode = require('./../codes/room')

let room = {
  async getRoomList(ctx) {
    let reqData = ctx.request.query;
    console.log('getRoomList', reqData, reqData.username);
    let res = {
      code: '',
      message: '',
      data: {}
    }
    let result = await roomService.getRoomList(reqData.username);
    if (result) {
      res.code = '100000',
      res.data = result
    } else {
      res.code = '120000',
      res.message = 'error'
    }
    ctx.body = res;
  },
} 

module.exports = room
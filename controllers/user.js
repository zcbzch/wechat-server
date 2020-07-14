const userService = require('./../services/user')
// const userCode = require('./../codes/user')

let user = {
  async signIn(ctx) {
    let formData = ctx.request.body;
    console.log('signIn', formData);
    console.log(ctx.request.body.username, formData.password)
    let res = {
      code: '',
      message: '',
      data: {}
    }
    let result = await userService.signIn(formData);
    if (result) {
      if (formData.username === result.username) {
        res.code = 100000;
        res.data['token'] = 'thetoken';
      } else {
        res.message = '用户名密码错误',
        res.code = 110000;
      }
    } else {
      res.message = '用户不存在',
        res.code = 110000;
    }
    ctx.body = res;
  },

  async getUserInfo(ctx) {
    let reqData = ctx.request.query;
    console.log('getUserInfo', reqData, reqData.username);
    let res = {
      code: '',
      message: '',
      data: {}
    }
    let result = await userService.getUserInfo(reqData.username);
    if (result) {
      res.code = '100000',
      res.data = result
    }
    ctx.body = res;
  },
} 

module.exports = user
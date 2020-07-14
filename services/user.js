// const validator = require('validator') 表单验证
const userModel = require('./../models/user')
// const userCode = require('./../codes/user') 错误提示

const user = {
  /**
   * 登录
   * @param  {object}   登录表单信息
   * @return {object}   登录业务操作结果
   */
  async signIn(formData) {
    let userData = await userModel.getUser(formData.username, formData.password);
    // let result = {}
    return userData;
  },
  async getUserInfo(username) {
    console.log('service_params', username);
    let userInfo = await userModel.getUserInfo(username);
    console.log('service_result', userInfo);
    let result = {
      user_id: userInfo.user_id,
      username: userInfo.username,
      nickname: userInfo.nickname,
      icon: userInfo.icon
    }
    // let result = userInfo;
    return result;
  }
}

module.exports = user
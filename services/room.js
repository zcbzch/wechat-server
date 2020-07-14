// const validator = require('validator') 表单验证
const roomModel = require('./../models/room')
// const userCode = require('./../codes/user') 错误提示

const user = {
  /**
   * 登录
   * @param  {object}   登录表单信息
   * @return {object}   登录业务操作结果
   */
  async getRoomList(username) {
    console.log('service_params', username);
    let data = await roomModel.getRoomList(username);
    console.log('service_result', data);
    let roomList = data.map(item => {
      return item.room_id
    })
    let result = {
      roomList: roomList
    }
    // let result = data;
    return result;
  }
}

module.exports = user
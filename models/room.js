const query = require('../utils/query')
const user = require('./user')

const room = {
  async getRoomList(username) {
    let userInfo = await user.getUserInfo(username);
    console.log('user_id: ', userInfo.user_id);
    let user_id = userInfo.user_id;
    let sql = `select room_id from user_room where user_id=${user_id}`;
    let result = await query(sql);
    if ( Array.isArray(result) && result.length > 0 ) {
      // result.
      result = JSON.parse(JSON.stringify(result))
      console.log('models_result', result);
    } else {
      result = null
    }
    return result
  },
  async getRoomInfo(room_id) {
    let sql = `select * from room where room_id=${room_id} limit 1`;
    let result = await query(sql);
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
      console.log('models_result', result);
    } else {
      result = null
    }
    return result
  },
}

module.exports = room;
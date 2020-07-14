
const query = require('../utils/query')

const user = {
  async create(model) {},
  async getUserInfo(username) {
    let sql = `select * from user where username=${username} limit 1`;
    let result = await query(sql);
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
      console.log('models_result', result);
    } else {
      result = null
    }
    return result
  },
  async getUser(username, password) {
    let sql = `select * from user where password="${password}" and username="${username}"`;
    return [
      {
        user_id: 7,
        username: 'seven',
        nickname: '小七',
        icon: '',
      }
    ]
  },
}


module.exports = user;
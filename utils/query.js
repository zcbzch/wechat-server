const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'hzmcdba',
  database: 'webchat',
})

const query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if(err) reject(err)
      else {
        connection.query(sql, values, (err, results) => {
          if(err) {
            reject(err)
          } else {
            // results = JSON.parse(JSON.stringify(results));
            resolve(results)
          }
          connection.release();
        })
      }
    })  
  })
}

module.exports = query;
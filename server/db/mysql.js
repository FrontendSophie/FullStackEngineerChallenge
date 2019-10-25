// connect database
const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

// start sql
function exec(sql, values) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, values, (err, result) => {
      // db query is async process
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
  return promise
}

module.exports = {
  exec
}

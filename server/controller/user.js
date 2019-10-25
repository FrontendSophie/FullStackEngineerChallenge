const { exec } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = ({ username, password }) => {
  password = genPassword(password)

  let sql = 'select * from users where username=? and password=?;'
  return exec(sql, [username, password]).then(result => {
    return result[0] || {}
  })
}

const create = ({ username, password }) => {
  password = genPassword(password)

  let sql = `insert into users(username, password, role) values (?, ?, ?);`
  return exec(sql, [username, password, 1]).then(result => {
    return result.insertId
  })
}

const getAll = () => {
  let sql = 'select id, username, role from users'
  return exec(sql, []).then(result => {
    return result
  })
}

const getOne = user => {
  let sql = 'select id, username, role from users where id = ?'
  return exec(sql, [user.id]).then(result => {
    return result
  })
}

const update = (id, user) => {
  let sql = 'update users set username=? where id=?'

  return exec(sql, [user.username, id]).then(result => {
    return result.changedRows > 0
  })
}

const remove = id => {
  let sql = 'delete from users where id = ?'
  return exec(sql, [id]).then(result => {
    return result.affectedRows > 0
  })
}

module.exports = {
  login,
  create,
  getAll,
  getOne,
  update,
  remove
}

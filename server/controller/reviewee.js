const { exec } = require('../db/mysql')

const create = review => {
  let sql = `insert into reviews(reviewerId, revieweeId) values (?, ?);`
  return exec(sql, [review.reviewerId, review.revieweeId]).then(result => {
    return result.insertId
  })
}

const getAll = ({ reviewerId }) => {
  let sql = `
    select users.id as id, username, role, review
    from users
    left join reviews ON reviews.revieweeId = users.id
    where reviewerId = ?
  `
  return exec(sql, [reviewerId]).then(result => {
    return result
  })
}

const remove = ({ revieweeId, reviewerId }) => {
  let sql = 'delete from reviews where revieweeId = ? AND reviewerId = ?'
  return exec(sql, [revieweeId, reviewerId]).then(result => {
    return result.affectedRows > 0
  })
}

module.exports = {
  create,
  getAll,
  remove
}

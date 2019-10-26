const { exec } = require('../db/mysql')

const getAll = ({ reviewerId, revieweeId }) => {
  let sql = `
    select id, review, feedback
    from reviews
    where revieweeId = ? ${reviewerId ? 'and reviewerId = ?' : ''}
  `
  let params = reviewerId ? [revieweeId, reviewerId] : [revieweeId]
  return exec(sql, params).then(result => {
    return result
  })
}

const update = ({ review, reviewerId, revieweeId }) => {
  let sql = `
    insert into reviews(review, reviewerId, revieweeId)
    values(?, ?, ?)
    on duplicate key update review = ?
  `
  return exec(sql, [review, reviewerId, revieweeId, review]).then(result => {
    return result.affectedRows > 0
  })
}

module.exports = {
  getAll,
  update
}

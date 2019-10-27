const { exec } = require('../db/mysql')

const getAll = ({ reviewerId, revieweeId }) => {
  let sql = `
    select id, reviewerId, revieweeId, review, feedback
    from reviews
    where revieweeId = ? ${reviewerId ? 'and reviewerId = ?' : ''}
  `
  let params = reviewerId ? [revieweeId, reviewerId] : [revieweeId]
  return exec(sql, params).then(result => {
    return result
  })
}

const update = ({ review, feedback, reviewerId, revieweeId }) => {
  let sql = `
    insert into reviews(
      ${review ? 'review' : 'feedback'},
      reviewerId,
      revieweeId
    )
    values(?, ?, ?)
    on duplicate key update ${review ? 'review' : 'feedback'} = ?
  `
  let params = [review || feedback, reviewerId, revieweeId, review || feedback]
  return exec(sql, params).then(result => {
    return result.affectedRows > 0
  })
}

module.exports = {
  getAll,
  update
}

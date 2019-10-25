const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
  const isAdmin = req.session.role === 0
  if (isAdmin) {
    next()
  } else {
    res.json(new ErrorModel('401 unauthorized '))
  }
}

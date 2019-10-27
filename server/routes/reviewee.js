const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const revieweeCtrl = require('../controller/reviewee')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/:id', (req, res, next) => {
  return revieweeCtrl
    .getAll({
      reviewerId: req.params.id
    })
    .then(result => {
      res.json(new SuccessModel(result))
    })
})

router.post('/:id', auth, (req, res, next) => {
  return revieweeCtrl
    .create({
      revieweeId: req.body.revieweeId,
      reviewerId: req.params.id
    })
    .then(result => {
      res.json(new SuccessModel('added successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.delete('/:id', auth, (req, res, next) => {
  return revieweeCtrl
    .remove({
      revieweeId: req.body.revieweeId,
      reviewerId: req.params.id
    })
    .then(result => {
      res.json(new SuccessModel('deleted successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

module.exports = router

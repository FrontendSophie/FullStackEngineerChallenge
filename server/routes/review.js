const express = require('express')
const router = express.Router()

const reviewCtrl = require('../controller/review')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/:id', (req, res, next) => {
  return reviewCtrl
    .getAll({
      reviewerId: req.query.reviewerId,
      revieweeId: req.params.id
    })
    .then(result => {
      res.json(new SuccessModel(result))
    })
})

router.put('/:id', (req, res, next) => {
  return reviewCtrl
    .update({
      revieweeId: Number.parseInt(req.params.id),
      reviewerId: Number.parseInt(req.session.uid),
      review: req.body.review
    })
    .then(result => {
      res.json(new SuccessModel('updated successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.put('/:id/feedback', (req, res, next) => {
  return reviewCtrl
    .update({
      revieweeId: Number.parseInt(req.params.id),
      reviewerId: req.body.reviewerId,
      feedback: req.body.feedback
    })
    .then(result => {
      res.json(new SuccessModel('updated successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

module.exports = router

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const revieweeCtrl = require('../controller/reviewee')
const reviewCtrl = require('../controller/review')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/:id/reviewee', (req, res, next) => {
  return revieweeCtrl
    .getAll({
      reviewerId: req.params.id
    })
    .then(result => {
      res.json(new SuccessModel(result))
    })
})

router.post('/:id/reviewee', auth, (req, res, next) => {
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

router.delete('/:reviewerId/reviewee/:revieweeId', auth, (req, res, next) => {
  return revieweeCtrl
    .remove(req.params)
    .then(result => {
      res.json(new SuccessModel('deleted successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

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

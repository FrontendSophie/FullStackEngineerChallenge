const express = require('express')
const router = express.Router()

const userCtrl = require('../controller/user')
const reviewCtrl = require('../controller/review')

const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
  return userCtrl.login(req.body).then(({ username, role }) => {
    if (username) {
      req.session.username = username
      req.session.role = role
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('login failed'))
    }
  })
})

router.get('/current', (req, res, next) => {
  const username = req.session.username
  const role = req.session.role
  res.json(
    new SuccessModel({
      user: {
        username,
        role
      }
    })
  )
})

router.get('/', (req, res, next) => {
  return userCtrl
    .getAll()
    .then(result => {
      res.json(new SuccessModel(result))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.post('/', (req, res, next) => {
  return userCtrl
    .create(req.body)
    .then(result => {
      res.json(new SuccessModel('added successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.get('/:id', (req, res, next) => {
  return userCtrl
    .getOne()
    .then(result => {
      res.json(new SuccessModel(result))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.put('/:id', (req, res, next) => {
  return userCtrl
    .update(req.params.id, req.body)
    .then(result => {
      res.json(new SuccessModel('updated successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.delete('/:id', (req, res, next) => {
  return userCtrl
    .remove(req.params.id)
    .then(result => {
      res.json(new SuccessModel('deleted successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.get('/:id/reviewee', (req, res, next) => {
  return reviewCtrl
    .getAll({
      reviewerId: req.params.id
    })
    .then(result => {
      res.json(new SuccessModel(result))
    })
})

router.post('/:id/reviewee', (req, res, next) => {
  return reviewCtrl
    .create({
      revieweeId: req.body.revieweeId,
      reviewerId: req.params.id
    })
    .then(result => {
      res.json(new SuccessModel('added successfully'))
    })
})

router.delete('/:reviewerId/reviewee/:revieweeId', (req, res, next) => {
  return reviewCtrl.remove(req.params).then(result => {
    res.json(new SuccessModel('deleted successfully'))
  })
})

module.exports = router

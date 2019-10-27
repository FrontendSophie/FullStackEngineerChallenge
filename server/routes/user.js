const express = require('express')
const router = express.Router()

const userCtrl = require('../controller/user')
const auth = require('../middleware/auth')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
  return userCtrl.login(req.body).then(({ id, username, role }) => {
    if (username) {
      req.session.uid = id
      req.session.username = username
      req.session.role = role
      res.json(
        new SuccessModel({
          user: {
            id,
            username,
            role
          }
        })
      )
    } else {
      res.json(new ErrorModel('login failed'))
    }
  })
})

router.post('/logout', (req, res, next) => {
  req.session.uid = undefined
  req.session.username = undefined
  req.session.role = undefined
  res.json(new SuccessModel('logout succesfully!'))
})

router.get('/current', (req, res, next) => {
  const uid = req.session.uid
  const username = req.session.username
  const role = req.session.role
  res.json(
    new SuccessModel({
      id: uid,
      username,
      role
    })
  )
})

router.get('/', auth, (req, res, next) => {
  return userCtrl
    .getAll()
    .then(result => {
      res.json(new SuccessModel(result))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.post('/', auth, (req, res, next) => {
  return userCtrl
    .create(req.body)
    .then(result => {
      res.json(new SuccessModel('added successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.get('/:id', auth, (req, res, next) => {
  return userCtrl
    .getOne({
      id: req.params.id
    })
    .then(result => {
      res.json(new SuccessModel(result[0]))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.put('/:id', auth, (req, res, next) => {
  return userCtrl
    .update(req.params.id, req.body)
    .then(result => {
      res.json(new SuccessModel('updated successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

router.delete('/:id', auth, (req, res, next) => {
  return userCtrl
    .remove(req.params.id)
    .then(result => {
      res.json(new SuccessModel('deleted successfully'))
    })
    .catch(err => {
      res.json(new ErrorModel(err))
    })
})

module.exports = router

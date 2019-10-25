'use strict'

var dbm
var type
var seed
var cryp = require('../utils/cryp')

var username = 'admin'
var password = '123456'
var role = 0

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function(db) {
  return db.insert(
    'users',
    ['username', 'password', 'role'],
    [username, cryp.genPassword(password), 0]
  )
}

exports.down = function(db) {
  return db.runSql('DELETE FROM users where username=?', [username])
}

exports._meta = {
  version: 1
}

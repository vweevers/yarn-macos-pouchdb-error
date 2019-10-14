'use strict'

// Comment out this line to prevent the bug
const level = require('level')

const leveldown = require('leveldown')
const tempy = require('tempy')
const db = leveldown(tempy.directory())

let calls = 0

db.open(function (err) {
  if (calls++) throw new Error('Called too many times')
  if (err) throw err

  console.log('OK')
})

'use strict'

const a = require('./addon-a/build/Debug/addon_a.node')
const b = require('./addon-b/build/Debug/addon_b.node')

b.test(function () {
  console.log('callback')
})

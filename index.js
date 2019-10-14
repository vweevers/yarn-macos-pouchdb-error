'use strict'

function test (binding, location) {
  const context = binding.db_init()
  const options = { createIfMissing: true, errorIfExists: false }

  return function open () {
    let calls = 0
    binding.db_open(context, location, options, function (err) {
      if (calls++) throw new Error('Called too many times')
      if (err) throw err

      console.log('OK')
    })
  }
}

const ld_5_3_0 = require('./leveldown-5.3.0/prebuilds/darwin-x64/node.napi.node')
const ld_5_0_2 = require('./leveldown-5.0.2/prebuilds/darwin-x64/node-napi.node')

test(ld_5_0_2, 'test-db')()

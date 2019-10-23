'use strict'

const fs = require('fs')
const tmp = require('os').tmpdir()
const path = require('path')
const av = process.argv[2]
const bv = process.argv[3]

if (av && bv) {
  const a = load(av)
  const b = load(bv, av === bv)

  open(b, bv)
} else if (av) {
  open(load(av), av)
} else {
  console.error('usage: node index.js <version a> [version b]')
  process.exit(1)
}

function load (version, copy) {
  const nr = version.replace(/[^\w]/g, '')
  const id = `ld${nr}/build/Release/leveldown.node`
  const src = require.resolve(id)
  const dest = src.replace(/leveldown\.node$/, `ld${nr}.${copy ? 'b.' : ''}node`)
  const wrapped = path.join(tmp, `leveldown${nr}-${Date.now()}.js`)

  fs.copyFileSync(src, dest)
  console.log('Load %s (%s)', version, dest)

  fs.writeFileSync(wrapped, `
    const constants = require('os').constants.dlopen
    process.dlopen(module, ${JSON.stringify(dest)}, constants.RTLD_LOCAL | constants.RTLD_NOW)
  `)

  return require(wrapped)
}

function open (binding, version) {
  console.log('Open %s', version)

  const context = binding.db_init()
  const location = 'db/' + Date.now()
  const options = { createIfMissing: true, errorIfExists: false }

  let calls = 0
  binding.db_open(context, location, options, function (err) {
    if (calls++) throw new Error('Called too many times')
    if (err) throw err

    setTimeout(function () {
      console.log('\nOK')
    }, 1e3)
  })
}

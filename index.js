'use strict'

const fs = require('fs')
const platform = require('os').platform()
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
  const id = `ld${version.replace(/[^\d]/g, '')}/build/Debug/leveldown.node`
  let fp = require.resolve(id)

  if (copy) {
    const src = fp
    const dest = fp = fp.replace(/\.node$/, '.copy.node')
    fs.copyFileSync(src, dest)
  }

  console.log('Load %s', fp)
  return require(fp)
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

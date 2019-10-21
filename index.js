'use strict'

const av = process.argv[2]
const bv = process.argv[3]

if (av && bv) {
  if (av === bv) {
    console.error('Cannot compare version against itself')
    process.exit(1)
  }

  load(av)
  const b = load(bv)

  test(b, bv)
} else if (av) {
  test(load(av), av)
} else {
  console.error('usage: node index.js <version a> [version b]')
  process.exit(1)
}

function load (version) {
  const nr = version.replace(/[^\w]/g, '')
  const id = `ld${nr}`
  console.log('Load %s (as %s)', version, id)
  return require(id)
}

function test (leveldown, version) {
  console.log('Open %s', version)

  const location = 'db/' + Date.now()
  const db = leveldown(location)
  let it

  db.open(once(onopen))

  function onopen (err) {
    if (err) throw err

    db.batch()
      .put('key', 'value')
      .write(once(onwrite))
  }

  function onwrite (err) {
    if (err) throw err

    it = db.iterator({ keyAsBuffer: false, valueAsBuffer: false })
    it.next(once(onnext))
  }

  function onnext (err, key, value) {
    if (err) throw err
    if (key !== 'key') throw new Error('Wrong key')
    if (value !== 'value') throw new Error('Wrong value')

    it.end(once(onend))
  }

  function onend (err) {
    if (err) throw err

    setTimeout(function () {
      console.log('\nOK')
    }, 1e3)
  }
}

function once (fn) {
  let calls = 0
  return function () {
    if (calls++) throw new Error('Called too many times')
    fn.apply(this, arguments)
  }
}

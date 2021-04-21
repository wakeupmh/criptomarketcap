const R = require('ramda')
const fs = require('fs')

const readFileSync = path => fs.readFileSync(path, { enconding: 'utf-8' })

const handleReadFile = R.pipe(
  R.converge(R.concat, [
    R.pipe(
      R.replace(/.*\//,''),
      R.replace(/\..*$/,''),
      R.concat('date|'),
      R.concat(R.__, '\n')
    ),
    R.pipe(
      readFileSync,
      R.toString
    )
  ])
)

const extractPriceFromFile = R.pipe(
  handleReadFile,
  R.split('\n'),
  R.dropLast(1),
  R.map(R.pipe(
    R.split('|'),
    R.view(R.lensIndex(1))
  )),
  R.converge(R.map, [
    R.pipe(R.head, R.objOf),
    R.tail
  ])
)

R.pipe(
  R.map(extractPriceFromFile),
  R.transpose,
  R.map(R.mergeAll),
  console.log
)(['../input/eth.csv', '../input/btc.csv'])
